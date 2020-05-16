const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD, // Declare database password here
    host: process.env.HOST,            // Declare database password here
    port: process.env.DB_PORT,            // Declare port here
    database: process.env.DB_NAME,     // Declare database name here
})

module.exports = pool
