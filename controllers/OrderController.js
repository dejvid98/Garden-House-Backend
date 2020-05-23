const db = require('../db');

exports.createOrder = async (req, res) => {
  const {buyer, items} = req.body;

  const orderQuery = `INSERT INTO orders(buyer_id) values ($1) RETURNING id`;

  const order = await db.query(orderQuery, [buyer]);

  items.forEach(async item => {
    const itemQuery = `INSER INTO orderitem (shopitem_id, quantitiy, order_id) 
                        values ($1, $2, $3)`;

    await db.query(itemQuery, [
      item.shopitemid,
      item.quantitiy,
      order.rows[0].id,
    ]);
  });

  res.send({
    status: true,
    data: order.rows[0].id,
  });
};
