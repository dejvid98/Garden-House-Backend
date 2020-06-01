const express = require('express');
const router = express.Router();
const {
  getUserNurseries,
  addNursery,
  setTemeprature,
  setWaterLevel,
} = require('../controllers/NurseryController');

router.route('/').post(getUserNurseries);

router.route('/add').post(addNursery);

router.route('/temeprature').post(setTemeprature);

router.route('/water').post(setWaterLevel);

module.exports = router;
