const express = require('express')
const cors = require('cors')
const auth = require('./routes/AuthRoute')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/auth', auth)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is running!')
})