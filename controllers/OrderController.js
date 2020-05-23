const db = require('../db');

exports.createOrder = async (req, res) => {
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
    data: order.rows[0].id,
  });
};
