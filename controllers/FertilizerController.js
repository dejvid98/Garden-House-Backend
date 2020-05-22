const db = require('../db');
const moment = require('moment');

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

// Uses a fertilizer and reduces time for harvest on
// selected plant
exports.useFertilizer = async (req, res) => {
  try {
    const {id, seedling} = req.body;

    const fertilizerQuery = 'SELECT * FROM fertilizer WHERE id = $1';

    const fertilizerResult = await db.query(fertilizerQuery, [id]);

    const resultDeconstructed = {...fertilizerResult.rows[0]};

    if (Object.keys(resultDeconstructed).length == 0) {
      res.send({status: false, message: 'Fertilizer not found!'});
      return;
    }

    const speedUpTime = resultDeconstructed.speedup_time;

    const seedlingQuery = `SELECT * FROM seedling where id = $1`;

    const seedlingResult = await db.query(seedlingQuery, [seedling]);

    const seedlingDeconstructed = {...seedlingResult.rows[0]};

    const harvestDate = seedlingDeconstructed.harvest_date;

    const newHarvestDate = moment(harvestDate)
      .subtract(speedUpTime, 'days')
      .format();
    let updateSeedlingQuery;

    if (moment(newHarvestDate) <= moment()) {
      updateSeedlingQuery = `UPDATE seedling
                                 SET harvest_date = $1,
                                     harvest_ready = true
                                 WHERE id = $2`;
      await db.query(updateSeedlingQuery, [moment().format(), seedling]);
    } else {
      updateSeedlingQuery = `UPDATE seedling
                                 SET harvest_date = $1
                                 WHERE id = $2`;

      await db.query(updateSeedlingQuery, [newHarvestDate, seedling]);
    }

    const deleteFertilizerQuery = 'DELETE FROM fertilizer where id = $1';

    await db.query(deleteFertilizerQuery, [id]);

    res.send({
      stastus: true,
      data: `Harvest date succesffuly reduced by ${speedUpTime}`,
    });
  } catch (err) {
    res.send({
      stastus: false,
      message: err.message,
    });
  }
};
