const express = require('express');
const router = express.Router();
const {createRating, getAvgRating} = require('../controllers/RatingController');

router.route('/create').post(createRating);

router.route('/').post(getAvgRating);

module.exports = router;
