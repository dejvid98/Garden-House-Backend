const express = require('express');
const router = express.Router();
const {createOrder} = require('../controllers/OrderController');

router.route('/create').post(createOrder);

module.exports = router;
