const express = require('express');
const router = express.Router();
const {createComment} = require('../controllers/CommentController');

router.route('/create').post(createComment);

module.exports = router;
