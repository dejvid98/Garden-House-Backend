const express = require('express');
const router = express.Router();
const {
  createFertilizer,
  useFertilizer,
} = require('../controllers/FertilizerController');

router.route('/add').post(createFertilizer);

router.route('/use').post(useFertilizer);

module.exports = router;
