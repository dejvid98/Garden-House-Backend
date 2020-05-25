const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    const loginQuery = 'SELECT * FROM userprofile where email = $1';

    const result = await db.query(loginQuery, [email]);

    if (result.rowCount === 0) {
      res.send({
        message: 'Email does not exist!',
        status: false,
      });
      return;
    }

    const user = {...result.rows[0]};

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (!result) {
        res.send({
          message: 'Invalid password!',
          status: false,
        });
        return;
      }

      if (user.isaccepted !== 'accepted') {
        res.send({
          status: false,
          message: 'Administrator has not approved your account',
        });
        return;
      }
      
      delete user.password;

      jwt.sign(user, 'secertToken', (err, token) => {
        if (err) throw new Error(err);

        res.send({
          message: 'Successful login!',
          token,
          status: true,
        });
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: false,
    });
  }
};

exports.loginFirm = async (req, res) => {
  try {
    const {email, password} = req.body;

    const loginQuery = 'SELECT * FROM firm where email = $1';

    const result = await db.query(loginQuery, [email]);

    if (result.rowCount === 0) {
      res.send({
        message: 'Email does not exist!',
        status: false,
      });
      return;
    }

    const user = {...result.rows[0]};

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (!result) {
        res.send({
          message: 'Invalid password!',
          status: false,
        });
        return;
      }

      delete user.password;

      jwt.sign(user, 'secertToken', (err, token) => {
        if (err) throw new Error(err);

        res.send({
          message: 'Successful login!',
          token,
          status: true,
        });
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: false,
    });
  }
};
