const express = require('express');
const router = express.Router();
const {createShopItem} = require('../controllers/ShopItemController');

router.route('/create').post(createShopItem);

module.exports = router;
