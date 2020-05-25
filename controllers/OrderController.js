const db = require('../db');
const moment = require('moment');

exports.createOrder = async (req, res) => {
  try {
    const {buyer, items} = req.body;

    const orderQuery = `INSERT INTO orders (buyer_id) values ($1) RETURNING id`;

    const order = await db.query(orderQuery, [buyer]);

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
    const {orderid} = req.body;

    const updateStatusQuery = `UPDATE orders
                                SET status = 'shipping',
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
