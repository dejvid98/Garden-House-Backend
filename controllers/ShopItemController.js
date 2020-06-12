const db = require('../db');

exports.createShopItem = async (req, res) => {
  try {
    const {name, firm, type, quantity, speeduptime} = req.body;

    let query;

    if (speeduptime) {
      query = `INSERT INTO shopitem (name, firm, type, quantity,speedup_time)
                                    values ($1, $2, $3, $4, $5)`;

      await db.query(query, [name, firm, type, quantity, speeduptime]);
    } else {
      query = `INSERT INTO shopitem (name, firm, type, quantity)
                                    values ($1, $2, $3, $4)`;

      await db.query(query, [name, firm, type, quantity]);
    }

    res.send({
      status: true,
      message: 'Item successfully created!',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.deleteShopItem = async (req, res) => {
  try {
    const {id} = req.body;

    const shopItemQuery = `DELETE FROM shopitem WHERE id = $1`;
    
    await db.query(shopItemQuery, [id]);

    res.send({
      status: true,
      message: 'Item successfully deleted!',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getAllShopItems = async (req, res) => {
  try {
    const shopItemQuery = `SELECT * FROM shopitem`;

    const result = await db.query(shopItemQuery);

    res.send({
      status: true,
      data: result.rows,
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getFirmShopItems = async (req, res) => {
  try {
    const {id} = req.query;

    const shopItemQuery = `SELECT * FROM shopitem WHERE firm = $1`;

    const result = await db.query(shopItemQuery, [id]);

    res.send({
      status: true,
      data: result.rows,
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
