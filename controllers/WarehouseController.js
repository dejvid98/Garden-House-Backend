const db = require('../db');

exports.getAllItems = async (req, res) => {
  try {
    const {id} = req.body;

    let fertilizerQuery = `SELECT * FROM fertilizer WHERE warehouse_id = $1`;

    let seedlingQuery = `SELECT * from seedling WHERE warehouse_id = $1 AND 
                                                        is_planted = false`;

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

exports.getItems = async (req, res) => {};
