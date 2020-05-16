const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const isNameTaken = async (query, value) => {
    try {
        const resp = await db.query(query, [value]);

        if (resp.rowCount !== 0) return true;

        return false;

    } catch (err) {
        console.log(err);
    }
}

exports.registerFarmer = async (req, res) => {
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
        } = req.body

        const checkQuery = 'SELECT * FROM farmer where username = $1'

        const doesExist = await isNameTaken(checkQuery, username);

        if (doesExist) throw new Error(`Username is already taken!`);

        const salt = await bcrypt.genSalt(4);

        const hashedPassword = await bcrypt.hash(password, salt);

        const stringQuery = `INSERT INTO farmer
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
            values ($1,$2,$3,$4,$5,$6,$7,$8)`

        await db.query(stringQuery, [
            firstname,
            lastname,
            username,
            hashedPassword,
            birthday,
            birthlocation,
            phonenumber,
            email,
        ])

        res.send({
            message: "Farmer successfully registered!",
            success: true
        })

    } catch (err) {
        res.send({
            message: err.message,
            success: "false"
        })
    }
}

exports.registerFirm = async (req, res) => {
    try {
        const {
            fullname,
            shortname,
            password,
            foundeddate,
            location,
            email,
        } = req.body

        const checkQuery = 'SELECT * FROM firm where shortname = $1';

        const doesExist = await isNameTaken(checkQuery, shortname);

        if (doesExist) throw new Error('Name is already taken!');

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
            values ($1,$2,$3,$4,$5,$6)`

        await db.query(stringQuery, [
            fullname,
            shortname,
            foundeddate,
            hashedPassword,
            location,
            email,
        ])

        res.send({
            message: "Firm successfully registered!",
            success: true
        })

    } catch (err) {
        res.send({
            message: err.message,
            success: false
        })
    }
}
