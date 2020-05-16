const express = require('express')
const router = express.Router()
const { registerUser, registerFirm, loginUser, loginFirm } = require('../controllers/AuthController')

router.route('/register/user').post(registerUser)

router.route('/login/user').post(loginUser)

router.route('/register/firm').post(registerFirm)

router.route('/login/firm').post(loginFirm)

module.exports = router
