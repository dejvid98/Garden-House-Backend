const db = require('../db');
const bcrypt = require('bcrypt');

exports.changePasswordUser = async (req, res) => {
  try {
    const {email, password, newPassword} = req.body;

    const query = 'SELECT * from user where email = $1';

    const result = await db.query(query, [email]);

    const user = {...result.rows[0]};

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (!result) {
        res.send({
          status: false,
          message: 'Current password you entered is incorrect!',
        });
        return;
      }
    });

    bcrypt.compare(newPassword, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (result) {
        res.send({
          status: false,
          message: 'New password is same as current!',
        });
        return;
      }
    });

    const salt = await bcrypt.genSalt(4);

    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    const query2 = 'UPDATE user SET password = $1 where email = $2';

    db.query(query2, [newHashedPassword, email]);

    res.send({
      status: true,
      message: 'Password successfuly changed!',
    });

    const query2 = 'UPDATE user SET ';
  } catch (err) {
    res.send(err.message);
  }
};

exports.changePasswordFirm = async (req, res) => {
  try {
    const {email, password, newPassword} = req.body;

    const query = 'SELECT * from firm where email = $1';

    const result = await db.query(query, [email]);

    const user = {...result.rows[0]};

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (!result) {
        res.send({
          status: false,
          message: 'Current password you entered is incorrect!',
        });
        return;
      }
    });

    bcrypt.compare(newPassword, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (result) {
        res.send({
          status: false,
          message: 'New password is same as current!',
        });
        return;
      }
    });

    const salt = await bcrypt.genSalt(4);

    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    const query2 = 'UPDATE user SET password = $1 where email = $2';

    db.query(query2, [newHashedPassword, email]);

    res.send({
      status: true,
      message: 'Password successfuly changed!',
    });

    const query2 = 'UPDATE user SET ';
  } catch (err) {
    res.send(err.message);
  }
};
