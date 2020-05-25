const express = require('express');
const router = express.Router();
const {
  acceptRegistration,
  declineRegistration,
} = require('../controllers/AdminController');

router.route('/accept').post(acceptRegistration);

router.route('/decline').post(declineRegistration);

module.exports = router;
