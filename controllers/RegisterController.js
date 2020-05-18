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
        success: false,
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
            values ($1,$2,$3,$4,$5,$6,$7,$8)`;

    await db.query(stringQuery, [
      firstname,
      lastname,
      username,
      hashedPassword,
      birthday,
      birthlocation,
      phonenumber,
      email,
    ]);

    const payload = {
      user: {
        firstname,
        lastname,
        username,
        birthday,
        birthlocation,
        phonenumber,
        email,
      },
    };

    jwt.sign(payload, 'secertToken', (err, token) => {
      if (err) throw new Error(err);

      res.send({
        message: 'User successfully registered!',
        token,
        success: true,
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: 'false',
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
        success: false,
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
            values ($1,$2,$3,$4,$5,$6)`;

    await db.query(stringQuery, [
      fullname,
      shortname,
      foundeddate,
      hashedPassword,
      location,
      email,
    ]);

    const payload = {
      user: {
        fullname,
        shortname,
        foundeddate,
        location,
        email,
      },
    };

    jwt.sign(payload, 'secertToken', (err, token) => {
      if (err) throw new Error(err);

      res.send({
        message: 'Firm successfully registered!',
        token,
        success: true,
      });
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
};


