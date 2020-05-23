const db = require('../db');

exports.getAllItems = async (req, res) => {
  try {
    const {id} = req.body;

    const fertilizerQuery = `SELECT * FROM fertilizer WHERE warehouse_id = $1`;

    const fertilizers = await db.query(fertilizerQuery, [id]);

    const seedlingQuery = `SELECT * from seedling WHERE warehouse_id = $1 AND 
                                                        is_planted = false`;

    const seedlings = await db.query(seedlingQuery, [id]);

    const fertilizersData = fertilizers.rows;

    const seedlingsData = seedlings.rows;

    res.send({
      status: true,
      data: {
        seedlings: seedlingsData,
        fertilizers: fertilizersData,
      },
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
