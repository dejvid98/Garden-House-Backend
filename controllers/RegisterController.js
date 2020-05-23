const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const isNameTaken = async (query, value) => {
  try {
    const result = await db.query(query, [...value]);

    if (result.rowCount !== 0) return true;

    return false;
  } catch (err) {
    console.log(err);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      password,
      birthday,
      birthlocation,
      phonenumber,
      email,
    } = req.body;

    const checkQuery = `SELECT * FROM userprofile where (email = $1) OR (username = $2)`;

    const doesExist = await isNameTaken(checkQuery, [email, username]);

    if (doesExist) {
      res.send({
        message: 'Email/Username already exist!',
        status: false,
      });
      return;
    }

    // Hashing password before inserting it into DB
    const salt = await bcrypt.genSalt(4);

    const hashedPassword = await bcrypt.hash(password, salt);

    const stringQuery = `INSERT INTO userprofile
            (
                firstname,
                lastname,
                username,
                password,
                birthday,
                birthlocation,
                phonenumber,
                email
                            ) 
            values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ID`;

    const response = await db.query(stringQuery, [
      firstname,
      lastname,
      username,
      hashedPassword,
      birthday,
      birthlocation,
      phonenumber,
      email,
    ]);

    const ownerID = response.rows[0].id;

    const warehouseQuery = `INSERT INTO warehouse(owner_id) values ($1) RETURNING ID`;

    const warehouse = await db.query(warehouseQuery, [ownerID]);

    const warehouseId = warehouse.rows[0].id;

    const payload = {
      user: {
        firstname,
        lastname,
        username,
        birthday,
        birthlocation,
        phonenumber,
        email,
        id: response.rows[0].id,
        warehouse: warehouseId,
      },
    };

    jwt.sign(payload, 'secertToken', (err, token) => {
      if (err) throw new Error(err);

      res.send({
        message: 'User successfully registered!',
        token,
        status: true,
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 'false',
    });
  }
};

exports.registerFirm = async (req, res) => {
  try {
    const {
      fullname,
      shortname,
      password,
      foundeddate,
      location,
      email,
    } = req.body;

    const checkQuery =
      'SELECT * FROM firm where (shortname = $1) OR (email = $2)';

    const doesExist = await isNameTaken(checkQuery, [shortname, email]);

    if (doesExist) {
      res.send({
        message: 'Email/Name already exist!',
        status: false,
      });
      return;
    }

    // Hashing password before inserting it into DB
    const salt = await bcrypt.genSalt(4);

    const hashedPassword = await bcrypt.hash(password, salt);

    const stringQuery = `INSERT INTO firm
            (
                fullname,
                shortname,
                foundeddate,
                password,
                location,
                email
            ) 
            values ($1,$2,$3,$4,$5,$6) RETURNING id`;

    const response = await db.query(stringQuery, [
      fullname,
      shortname,
      foundeddate,
      hashedPassword,
      location,
      email,
    ]);

    const courierArray = [1, 2, 3, 4, 5];

    const createCouriers = async () => {
      const courierQuery = 'INSERT INTO courier(firm_id) values($1)';
      const firmId = await response.rows[0].id;
      await db.query(courierQuery, [firmId]);
    };

    courierArray.forEach(() => {
      createCouriers();
    });

    const payload = {
      user: {
        fullname,
        shortname,
        foundeddate,
        location,
        email,
        id: response.rows[0].id,
      },
    };

    jwt.sign(payload, 'secertToken', (err, token) => {
      if (err) throw new Error(err);

      res.send({
        message: 'Firm successfully registered!',
        token,
        status: true,
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: false,
    });
  }
};
