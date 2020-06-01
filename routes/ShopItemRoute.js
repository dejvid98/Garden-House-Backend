const express = require('express');
const router = express.Router();
const {
  createShopItem,
  deleteShopItem,
  getAllShopItems,
  getFirmShopItems,
} = require('../controllers/ShopItemController');

router.route('/create').post(createShopItem);

router.route('/delete').post(deleteShopItem);

router.route('/').post(getAllShopItems);

router.route('/firm').post(getFirmShopItems);

module.exports = router;
