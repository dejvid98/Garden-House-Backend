const express = require('express');
const router = express.Router();
const {createSeedling} = require('../controllers/SeedlingController');

router.route('/add').post(createSeedling);

module.exports = router;
