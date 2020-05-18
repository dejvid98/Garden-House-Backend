const db = require('../db');
const bcrypt = require('bcrypt');

exports.changePasswordUser = async (req, res) => {
  try {
    const {email, password, newpassword} = req.body;

    const query = 'SELECT * from userprofile where email = $1';

    const result = await db.query(query, [email]);

    const user = {...result.rows[0]};

    bcrypt.compare(password, user.password).then(result => {
      if (!result) {
        res.send({
          status: false,
          message: 'Current password you entered is incorrect!',
        });
        return;
      }

      bcrypt.compare(newpassword, user.password).then(async result => {
        if (result) {
          res.send({
            status: false,
            message: 'New password is same as current!',
          });
          return;
        }

        const salt = await bcrypt.genSalt(4);

        const newHashedPassword = await bcrypt.hash(newpassword, salt);

        const query2 = 'UPDATE userprofile SET password = $1 where email = $2';

        db.query(query2, [newHashedPassword, email]);

        res.send({
          status: true,
          message: 'Password successfuly changed!',
        });
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

exports.changePasswordFirm = async (req, res) => {
  try {
    const {email, password, newpassword} = req.body;

    const query = 'SELECT * from firm where email = $1';

    const result = await db.query(query, [email]);

    const user = {...result.rows[0]};

    bcrypt.compare(password, user.password).then(result => {
      if (!result) {
        res.send({
          status: false,
          message: 'Current password you entered is incorrect!',
        });
        return;
      }

      bcrypt.compare(newpassword, user.password).then(async result => {
        if (result) {
          res.send({
            status: false,
            message: 'New password is same as current!',
          });
          return;
        }

        const salt = await bcrypt.genSalt(4);

        const newHashedPassword = await bcrypt.hash(newpassword, salt);

        const query2 = 'UPDATE firm SET password = $1 where email = $2';

        db.query(query2, [newHashedPassword, email]);

        res.send({
          status: true,
          message: 'Password successfuly changed!',
        });
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};
