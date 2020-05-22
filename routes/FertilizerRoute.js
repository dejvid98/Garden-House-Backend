const express = require('express');
const router = express.Router();
const {createFertilizer,useFertilizer} = require('../controllers/FertilizerController');

router.route('/createfertilizer').post(createFertilizer);

router.route('/usefertilizer').post(useFertilizer);

module.exports = router;
