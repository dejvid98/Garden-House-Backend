const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

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

        const stringQuery = `INSERT INTO farmer
            (
                firstname,
                lastname,
                username,
                password,
                birthday,
                birthlocation
                phonenumber,
                email
            ) 
            values
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
            )`

        const resp = db.query(stringQuery, [
            firstname,
            lastname,
            username,
            password,
            birthday,
            birthlocation,
            phonenumber,
            email,
        ])
        res.send(resp)
    } catch (err) {
        console.log('ERROS')
        console.error(err.message)
    }
}
