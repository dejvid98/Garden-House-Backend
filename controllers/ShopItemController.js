const db = require('../db');

exports.createShopItem = async (req, res) => {
  try {
    const {name, firm, type, quantity} = req.body;

    const shopItemQuery = `INSERT INTO shopitem (name, firm, type, quantitiy)
                                    values ($1, $2, $3, $4)`;

    await db.query(shopItemQuery, [name, firm, type, quantity]);

    res.send({
      status: true,
      message: 'Item successfully created!',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
