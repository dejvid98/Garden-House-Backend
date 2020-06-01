const express = require('express');
const router = express.Router();
const {getAllItems} = require('../controllers/WarehouseController');

router.route('/').post(getAllItems);

module.exports = router;
