const db = require('../db');
const moment = require('moment');

exports.createOrder = async (req, res) => {
  try {
    const {buyer, items} = req.body;

    const firmArray = [];

    const query = `SELECT * FROM shopitem 
                   JOIN firm ON shopitem.firm = firm.id  
                   WHERE shopitem.id = $1`;

    await Promise.all(
      items.map(async item => {
        const result = await db.query(query, [item.shopitem_id]);
        if (firmArray.length > 0) {
          if (firmArray.includes(result.rows[0].shortname)) return;
        }
        firmArray.push(result.rows[0].shortname);
      }),
    );

    const orderQuery = `INSERT INTO orders (buyer_id,firms) values ($1,$2) RETURNING id`;

    const order = await db.query(orderQuery, [buyer, firmArray]);

    items.forEach(async item => {
      const itemQuery = `INSERT INTO orderitem (shopitem_id, quantity, order_id) 
                        values ($1, $2, $3)`;

      await db.query(itemQuery, [
        item.shopitem_id,
        item.quantity,
        order.rows[0].id,
      ]);
    });

    res.send({
      status: true,
      message: 'Order successfully created!',
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

// Acepts an order, changes status of it,
// and decreases quantity of shopitem from the order
exports.aceptOrder = async (req, res) => {
  try {
    const {orderid, firm} = req.body;

    const courierQuery = `SELECT * FROM courier WHERE firm_id = $1 AND is_busy = false`;

    const courierResp = await db.query(courierQuery, [firm]);

    if (courierResp.rows.length < 1) {
      res.send({status: false, message: 'All couriers are currently busy!'});
      return;
    }

    const courierBusyQuery = `UPDATE courier
                              SET is_busy = true,
                                  delivery_time = $1
                              WHERE id = $2`;

    await db.query(courierBusyQuery, [
      moment().add(1, 'day'),
      courierResp.rows[0].id,
    ]);

    // Make courier available after product is delivered
    setTimeout(async () => {
      const makeCourierAvailable = `UPDATE courier
                                    SET is_busy = false,
                                        delivery_time = null
                                    WHERE id = $1`;
      await db.query(makeCourierAvailable, [courierResp.rows[0].id]);
    }, 24 * 3600 * 1000);

    const updateStatusQuery = `UPDATE orders
                                SET status = 'shipping',
                                    is_acepted = true,
                                    delivery_date = $1
                                WHERE id = $2`;

    await db.query(updateStatusQuery, [moment().add(1, 'day'), orderid]);

    const orderItemsQuery = `SELECT shopitem_id,
                                  SUM(quantity) as quantity 
                          FROM orderitem WHERE order_id = $1
                          GROUP BY shopitem_id`;

    const result = await db.query(orderItemsQuery, [orderid]);

    const data = result.rows;

    // Loops thru an array, and decreases
    // quantity of each shopitem
    data.forEach(async item => {
      const checkIfBelowZero = 'SELECT * FROM shopitem WHERE id = $1';

      const checkResult = await db.query(checkIfBelowZero, [item.shopitem_id]);

      let itemQuery = '';

      if (checkResult.rows[0].quantity + item.quantity < 0) {
        itemQuery = `UPDATE shopitem
                        SET quantity = 0
                        WHERE id = $1`;

        await db.query(itemQuery, [item.shopitem_id]);
      } else {
        itemQuery = `UPDATE shopitem
                        SET quantity = quantity - $1
                        WHERE id = $2`;

        await db.query(itemQuery, [item.quantity, item.shopitem_id]);
      }
    });

    res.send({
      status: true,
      message: 'Order accepted',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.declineOrder = async (req, res) => {
  try {
    const {orderid} = req.body;

    const updateStatusQuery = `UPDATE orders
                                SET status = 'declined'
                                WHERE id = $1`;

    await db.query(updateStatusQuery, [orderid]);

    res.send({
      status: true,
      message: 'Order declined',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const {orderid} = req.body;

    const updateStatusQuery = `UPDATE orders
                                SET status = 'cancled'
                                WHERE id = $1`;

    await db.query(updateStatusQuery, [orderid]);

    res.send({
      status: true,
      message: 'Order cancled',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getPendingOrders = async (req, res) => {
  try {
    const {name} = req.body;

    const orderQuery = `SELECT * FROM orders WHERE $1=ANY(firms)`;

    const result = await db.query(orderQuery, [name]);

    res.send({status: true, data: result.rows});
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const {id} = req.body;

    const orderQuery = `SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC`;

    const result = await db.query(orderQuery, [id]);

    res.send({status: true, data: result.rows});
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
