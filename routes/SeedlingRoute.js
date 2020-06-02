const express = require('express');
const router = express.Router();
const {
  createSeedling,
  plantSeedling,
  getAvailableUserSeedlings,
  harvestSeedling,
  getNurserySeedlings
} = require('../controllers/SeedlingController');

router.route('/add').post(createSeedling);

router.route('/plant').post(plantSeedling);

router.route('/').post(getAvailableUserSeedlings);

router.route('/harvest').post(harvestSeedling);

router.route('/nursery').post(getNurserySeedlings);

module.exports = router;
