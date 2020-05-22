const db = require('../db');
const moment = require('moment');

exports.createSeedling = async (req, res) => {
  try {
    const {name, ownerid, nurseryid} = req.body;

    const seedlingQuery = `INSERT INTO seedling(
                            name,
                            owner_id,
                            nursery_id)
                        values($1, $2, $3)`;

    await db.query(seedlingQuery, [name, ownerid, nurseryid]);

    res.send({
      status: true,
      message: 'Seedling successfully created!',
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

exports.plantSeedling = async (req, res) => {
  try {
    const {id} = req.body;

    const plantedDate = moment();

    const harvestDate = moment().add(20, 'days');

    const seedlingQuery = `UPDATE seedling
                           SET is_planted = $1,
                               planted_date = $2,
                               harvest_date = $3
                           WHERE id = $4`;

    await db.query(seedlingQuery, [true, plantedDate, harvestDate, id]);

    res.send({
      status: true,
      message: 'Seedling successfully planted!',
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};
