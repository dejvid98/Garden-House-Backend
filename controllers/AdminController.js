const db = require('../db');

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
