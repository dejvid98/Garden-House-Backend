const express = require('express');
const router = express.Router();
const {createOrder, aceptOrder} = require('../controllers/OrderController');

router.route('/create').post(createOrder);

router.route('/acept').post(aceptOrder);

module.exports = router;
