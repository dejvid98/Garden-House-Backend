const express = require('express');
const router = express.Router();
const {createRating, getAvgRating} = require('../controllers/RatingController');

router.route('/create').post(createRating);

router.route('/').get(getAvgRating);

module.exports = router;
