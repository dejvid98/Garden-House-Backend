const db = require('../db');

exports.getUserNurseries = async (req, res) => {
  try {
    const {email} = req.body;

    const query = 'SELECT * from nursery where owneremail = $1';

    const result = await db.query(query, [email]);

    res.send({status: true, data: result});
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

    const query = `INSERT INTO nursery (
                    owneremail,
                    length,
                    width,
                    name,
                    address) 
                    values($1, $2, $3, $4, $5)`;

    await db.query(query, [owneremail, length, width, name, address]);

    res.send({status: true, message: 'Nursery successfully added!'});
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};
