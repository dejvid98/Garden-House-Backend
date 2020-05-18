const express = require('express');
const router = express.Router();
const {loginUser, loginFirm} = require('../controllers/LoginController');

router.route('/user').post(loginUser);

router.route('/firm').post(loginFirm);

module.exports = router;
