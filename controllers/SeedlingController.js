const db = require('../db');
const moment = require('moment');

exports.createSeedling = async (req, res) => {
  try {
    const {name, warehouse_id} = req.body;

    const seedlingQuery = `INSERT INTO seedling(
                            name,
                            warehouse_id)
                        values($1, $2)`;

    await db.query(seedlingQuery, [name, warehouse_id]);

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

exports.getNurserySeedlings = async (req, res) => {
  try {
    const {id} = req.body;

    const query = `SELECT * FROM seedling 
                    WHERE nursery_id = $1`;

    const resp = await db.query(query, [id]);

    const data = resp.rows;

    res.send({
      status: true,
      data,
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getAvailableUserSeedlings = async (req, res) => {
  try {
    const {id} = req.body;

    const seedlingsQuery = `SELECT * FROM seedling 
                          WHERE nursery_id = $1 AND is_planted=false`;

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
    const {name, nurseryid, warehouse_id} = req.body;

    const plantedDate = moment();

    const harvestDate = moment().add(20, 'days');

    const seedQuery = `SELECT * FROM seedling
                        WHERE is_planted = false AND name = $1 AND warehouse_id = $2`;

    const seeds = await db.query(seedQuery, [name, warehouse_id]);

    const seedId = seeds.rows[0].id;

    const seedlingQuery = `UPDATE seedling
                           SET is_planted = true,
                               planted_date = $1,
                               harvest_date = $2,
                               nursery_id = $3
                           WHERE id=$4`;

    await db.query(seedlingQuery, [
      plantedDate,
      harvestDate,
      nurseryid,
      seedId,
    ]);

    const updateAvailableSpots = `UPDATE nursery
                                  SET available_space = available_space - 1
                                  WHERE id = $1`;

    await db.query(updateAvailableSpots, [nurseryid]);

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
