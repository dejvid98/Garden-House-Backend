const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getSeedlings,
} = require('../controllers/WarehouseController');

router.route('/').post(getAllItems);

router.route('/seedling').post(getSeedlings);

module.exports = router;
