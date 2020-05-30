const db = require('../db');

exports.getPendingRegistrations = async (req, res) => {
  try {
    const query = `SELECT * FROM userprofile ORDER BY created_at DESC`;

    const result = await db.query(query);

    res.send({
      status: true,
      data: result.rows,
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getUserStatistics = async (req,res) =>{
    try {
      const query = `SELECT isaccepted,COUNT(isaccepted) FROM userprofile
                            GROUP BY isaccepted ORDER BY isaccepted`;

      const result = await db.query(query);

      res.send({
        status: true,
        data: result.rows,
      });
    } catch (err) {
      res.send({status: false, message: err.message});
    }
}

exports.acceptRegistration = async (req, res) => {
  try {
    const {id} = req.body;

    const acceptQuery = `UPDATE userprofile
                         SET isAccepted = 'accepted'
                         WHERE id = $1`;

    await db.query(acceptQuery, [id]);

    res.send({
      status: true,
      message: 'User accepted!',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.declineRegistration = async (req, res) => {
  try {
    const {id} = req.body;

    const acceptQuery = `UPDATE userprofile
                         SET isAccepted = 'declined'
                         WHERE id = $1`;

    await db.query(acceptQuery, [id]);

    res.send({
      status: true,
      message: 'User declined!',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
