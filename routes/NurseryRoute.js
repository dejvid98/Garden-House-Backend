const express = require('express');
const router = express.Router();
const {
  getUserNurseries,
  addNursery,
} = require('../controllers/NurseryController');

router.route('/').get(getUserNurseries);

router.route('/add').post(addNursery);

module.exports = router;
