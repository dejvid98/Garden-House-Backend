const db = require('../db');

// Decreases levels of water and temeprature
// every hour for all nurseries
(() => {
  const decreaseLevels = () => {
    const query = `UPDATE nursery 
       SET waterlevel = waterlevel - 1, 
       temeprature = temeprature - 1
       WHERE waterlevel != 0 OR temeperature != -15`;

    db.query(query);
  };
  setInterval(decreaseLevels, 3600 * 1000);
})();

exports.getNurseryById = async (req, res) => {
  try {
    const {id} = req.body;

    const query = `SELECT * FROM nursery WHERE id = $1`;

    const data = await db.query(query, [id]);

    res.send({status: true, data});
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getUserNurseries = async (req, res) => {
  try {
    const {email} = req.body;

    const query = 'SELECT * FROM nursery WHERE owneremail = $1';

    const result = await db.query(query, [email]);

    res.send({status: true, data: result.rows});
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

exports.addNursery = async (req, res) => {
  try {
    const {owneremail, length, width, name, address} = req.body;

    const calculateAvailableSpace = (length, width) => {
      return length * width;
    };

    const availableSpace = calculateAvailableSpace(length, width);

    const query = `INSERT INTO nursery (
                    owneremail,
                    length,
                    width,
                    available_space,
                    name,
                    address) 
                    values($1, $2, $3, $4, $5, $6)`;

    await db.query(query, [
      owneremail,
      length,
      width,
      availableSpace,
      name,
      address,
    ]);

    res.send({status: true, message: 'Nursery successfully added!'});
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

exports.setTemeprature = async (req, res) => {
  try {
    const {id, temeprature} = req.body;

    const query = `UPDATE nursery SET temeprature = $1 WHERE id = $2`;

    await db.query(query, [temeprature, id]);

    res.send({status: true, message: 'Temeprature successfully increased!'});
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

exports.setWaterLevel = async (req, res) => {
  try {
    const {id, water} = req.body;

    const query = `UPDATE nursery SET waterlevel = $1 WHERE id = $2`;

    await db.query(query, [water, id]);

    res.send({status: true, message: 'Water successfully increased!'});
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

exports.getSeedlings = async (req, res) => {};
