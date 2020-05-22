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

exports.getAvailableUserSeedlings = async (req, res) => {
  try {
    const {id} = req.body;

    const seedlingsQuery = `SELECT * FROM seedling 
                          WHERE id = $1 AND is_planted=false`;

    const result = await db.query(seedlingsQuery, [id]);

    res.send({
      status: true,
      data: result.rows,
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.plantSeedling = async (req, res) => {
  try {
    const {id, nurseryid} = req.body;

    const plantedDate = moment();

    const harvestDate = moment().add(20, 'days');

    const checkIfPlantedQuery = `SELECT * FROM seedling 
                                 WHERE id = $1`;

    const seedResult = await db.query(checkIfPlantedQuery, [id]);

    const seedDeconcstured = {...seedResult.rows[0]};

    const isPlanted = seedDeconcstured.is_planted;

    if (isPlanted) {
      res.send({status: false, message: 'Seedling already planted!'});
      return;
    }

    const updateAvailableSpots = `UPDATE nursery
                                  SET available_space = available_space - 1
                                  WHERE id = $1`;

    await db.query(updateAvailableSpots, [nurseryid]);

    const seedlingQuery = `UPDATE seedling
                           SET is_planted = $1,
                               planted_date = $2,
                               harvest_date = $3,
                               nursery_id = $4
                           WHERE id = $5`;

    await db.query(seedlingQuery, [
      true,
      plantedDate,
      harvestDate,
      nurseryid,
      id,
    ]);

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

exports.harvestSeedling = async (req, res) => {
  try {
    const {id, nurseryid} = req.body;

    const seedlingQuery = 'SELECT * FROM seedling WHERE id = $1';

    const result = await db.query(seedlingQuery, [id]);

    const resultDeconstructed = {...result.rows[0]};

    if (resultDeconstructed.harvest_date >= moment()) {
      res.send({
        status: false,
        message: 'Seedling is not ready for harvesty yet!',
      });
      return;
    }
    const transplantDate = moment().add(1, 'day').format();

    const setTransplantDateQuery = `UPDATE seedling
                                    SET transplant_date = $1
                                    WHERE id = $2`;
    await db.query(setTransplantDateQuery, [transplantDate, id]);

    const deleteSeedling = async () => {
      const harvestQuery = 'DELETE FROM seedling WHERE id = $1';

      await db.query(harvestQuery, [id]);

      const nurseryQuery = `UPDATE nursery 
                         SET available_space = available_space + 1 
                         WHERE id = $1`;

      await db.query(nurseryQuery, [nurseryid]);
    };

    setTimeout(deleteSeedling, 24 * 3600 * 1000);

    res.send({
      status: true,
      message: 'Seedling will be transplanted within 24 hours!',
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};
