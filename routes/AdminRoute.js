const express = require('express');
const router = express.Router();
const {
  acceptRegistration,
  declineRegistration,
  getPendingRegistrations,
} = require('../controllers/AdminController');

router.route('/').get(getPendingRegistrations);

router.route('/accept').post(acceptRegistration);

router.route('/decline').post(declineRegistration);

module.exports = router;
