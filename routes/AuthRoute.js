const express = require('express')
const router = express.Router()
const { registerFarmer } = require('../controllers/AuthController')

router.route('/register/farmer').post(registerFarmer)

module.exports = router
