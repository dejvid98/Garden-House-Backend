const express = require('express');
const router = express.Router();
const {
  createComment,
  getAllComments,
} = require('../controllers/CommentController');

router.route('/').get(getAllComments);

router.route('/create').post(createComment);

module.exports = router;
