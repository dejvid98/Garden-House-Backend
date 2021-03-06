const express = require('express');
const router = express.Router();
const {
  createOrder,
  aceptOrder,
  declineOrder,
  cancelOrder,
  getPendingOrders,
  getUserOrders
} = require('../controllers/OrderController');

router.route('/create').post(createOrder);

router.route('/acept').post(aceptOrder);

router.route('/decline').post(declineOrder);

router.route('/cancel').post(cancelOrder);

router.route('/user').post(getUserOrders)

router.route('/').post(getPendingOrders);

module.exports = router;
