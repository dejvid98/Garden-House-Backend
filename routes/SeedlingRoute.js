const express = require('express');
const router = express.Router();
const {
  createSeedling,
  plantSeedling,
} = require('../controllers/SeedlingController');

router.route('/add').post(createSeedling);

router.route('/plant').post(plantSeedling);

module.exports = router;
