const express = require('express');
const router = express.Router();
const {
  getUserNurseries,
  addNursery,
  setTemeprature,
  setWaterLevel,
} = require('../controllers/NurseryController');

router.route('/').get(getUserNurseries);

router.route('/add').post(addNursery);

router.route('/temeprature').post(setTemeprature);

router.route('/water').post(setWaterLevel);

module.exports = router;
