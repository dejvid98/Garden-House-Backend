const db = require('../db');

exports.createFertilizer = async (req, res) => {
  try {
    const {name, firm, speeduptime, ownerid} = req.body;

    const fertilizerQuery = `INSERT INTO fertilizer(
                                name,
                                firm,
                                speedup_time,
                                owner_id)
                                values ($1,$2,$3,$4)`;

    await db.query(fertilizerQuery, [name, firm, speeduptime, ownerid]);

    res.send({
      stastus: true,
      message: 'Fertilizer successfully created!',
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

exports.useFertilizer = async (req, res) => {
  const {id, seedling} = req.body;
  const fertilizerQuery = 'SELECT * FROM fertilizer WHERE id = $1';
  const fertilizerResult = await db.query(fertilizerQuery, [id]);

  res.send({
    stastus: true,
    data: fertilizerResult.rows[0],
  });
};
