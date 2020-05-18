const express = require('express');
const router = express.Router();
const {changePasswordUser,changePasswordFirm} = require('../controllers/PasswordChangeController');

router.route('/user').post(changePasswordUser);

router.route('/firm').post(changePasswordFirm);

module.exports = router;
