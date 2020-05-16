const express = require('express')
const router = express.Router()
const { registerFarmer,registerFirm } = require('../controllers/AuthController')

router.route('/register/farmer').post(registerFarmer)

router.route('/register/firm').post(registerFirm)

module.exports = router
