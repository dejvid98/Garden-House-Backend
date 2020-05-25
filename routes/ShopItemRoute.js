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

router.route('/').get(getAllShopItems);

router.route('/firm').get(getFirmShopItems);

module.exports = router;
