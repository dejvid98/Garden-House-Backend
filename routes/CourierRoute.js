const express = require('express');
const router = express.Router();
const {getAvailableCouriers} = require('../controllers/CourierController');

router.route('/').get(getAvailableCouriers);

module.exports = router;
