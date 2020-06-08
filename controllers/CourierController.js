const db = require('../db');

exports.getAvailableCouriers = async (req, res) => {
  try {
    const {id} = req.body;

    const courierQuery = `SELECT * FROM courier 
                        WHERE firm_id = $1 AND is_busy = false`;

    const resp = await db.query(courierQuery, [id]);

    res.send({status: true, data: resp.rows.length});
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
