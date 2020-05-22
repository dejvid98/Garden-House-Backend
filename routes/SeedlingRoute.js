const express = require('express');
const router = express.Router();
const {
  createSeedling,
  plantSeedling,
  getAvailableUserSeedlings,
  harvestSeedling,
} = require('../controllers/SeedlingController');

router.route('/add').post(createSeedling);

router.route('/plant').post(plantSeedling);

router.route('/').get(getAvailableUserSeedlings);

router.route('/harvest').post(harvestSeedling);

module.exports = router;
