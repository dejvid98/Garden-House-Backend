const express = require('express');
const router = express.Router();
const {
  registerUser,
  registerFirm,
} = require('../controllers/RegisterController');

router.route('/user').post(registerUser);

router.route('/firm').post(registerFirm);

module.exports = router;
