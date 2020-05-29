const express = require('express');
const router = express.Router();
const {
  acceptRegistration,
  declineRegistration,
  getPendingRegistrations,
  getUserStatistics
} = require('../controllers/AdminController');

router.route('/').get(getPendingRegistrations);

router.route('/stats').get(getUserStatistics);

router.route('/accept').post(acceptRegistration);

router.route('/decline').post(declineRegistration);

module.exports = router;
