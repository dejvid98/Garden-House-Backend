const express = require('express');
const router = express.Router();
const {
  createOrder,
  aceptOrder,
  declineOrder,
  cancelOrder,
  getPendingOrders,
} = require('../controllers/OrderController');

router.route('/create').post(createOrder);

router.route('/acept').post(aceptOrder);

router.route('/decline').post(declineOrder);

router.route('/cancel').post(cancelOrder);

router.route('/').post(getPendingOrders);

module.exports = router;
