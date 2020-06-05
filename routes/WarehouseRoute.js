const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getSeedlings,
  findWarehouse
} = require('../controllers/WarehouseController');

router.route('/').post(getAllItems);

router.route('/find').post(findWarehouse);

router.route('/seedling').post(getSeedlings);

module.exports = router;
