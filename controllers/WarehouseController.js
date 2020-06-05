const db = require('../db');

exports.getAllItems = async (req, res) => {
  try {
    const {id} = req.body;

    let fertilizerQuery = `SELECT name,COUNT(name),speedup_time FROM fertilizer 
                          WHERE warehouse_id = $1
                          GROUP BY name`;

    let seedlingQuery = `SELECT name,COUNT(name) FROM seedling 
                          WHERE is_planted = false AND warehouse_id = $1
                          GROUP BY name`;

    const data = {};

    if (req.body.sort) {
      fertilizerQuery += ` ORDER BY ${req.body.sort} ${req.body.order}`;
      seedlingQuery += ` ORDER BY ${req.body.sort} ${req.body.order}`;
    }

    if (req.body.fertilizers) {
      const fertilizers = await db.query(fertilizerQuery, [id]);

      const fertilizersData = fertilizers.rows;

      data.fertilizers = fertilizersData;
    }

    if (req.body.seedlings) {
      const seedlings = await db.query(seedlingQuery, [id]);

      const seedlingsData = seedlings.rows;

      data.seedlings = seedlingsData;
    }

    res.send({
      status: true,
      data,
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getSeedlings = async (req, res) => {
  try {
    const {id} = req.body;

    const query = `SELECT * FROM warehouse WHERE owner_id = $1`;

    const resp = await db.query(query, [id]);

    const wareHouseId = resp.rows[0].id;

    const seedlingQuery = `SELECT name,COUNT(seedling.id),warehouse_id FROM seedling WHERE warehouse_id=$1 AND is_planted = false
                            GROUP BY name,warehouse_id;`;

    const data = await db.query(seedlingQuery, [wareHouseId]);

    res.send({status: true, data: data.rows});
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.findWarehouse = async (req, res) => {
  try {
    const {id} = req.body;

    const query = `SELECT * FROM warehouse WHERE owner_id = $1`;

    const resp = await db.query(query, [id]);

    res.send({stats: true, data: resp.rows});
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
