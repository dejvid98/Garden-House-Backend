const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getSeedlings,
  findWarehouse,
  getFertilizers,
} = require('../controllers/WarehouseController');

router.route('/').post(getAllItems);

router.route('/find').post(findWarehouse);

router.route('/seedling').post(getSeedlings);

router.route('/fertilizer').post(getFertilizers);

module.exports = router;
