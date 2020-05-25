const express = require('express');
const router = express.Router();
const {createRating} = require('../controllers/RatingController');

router.route('/create').post(createRating);

module.exports = router;
