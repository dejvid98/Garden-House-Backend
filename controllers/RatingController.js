const db = require('../db');

exports.createRating = async (req, res) => {
  try {
    const {username, product, rating} = req.body;

    const checkIfItemPurchased = `SELECT * FROM orderitem
                                  JOIN orders ON (orderitem.order_id = orders.id)
                                  WHERE shopitem_id = $1 AND buyer_id = $2 AND is_acepted = true`;

    const isPurchasedResult = await db.query(checkIfItemPurchased, [
      product,
      username,
    ]);

    if (isPurchasedResult.rows.length < 1) {
      res.send({status: false, message: 'You have not purchased this item'});
      return;
    }

    const checkIfRatedQuery = `SELECT * FROM rating
                                    WHERE username = $1 AND product = $2`;

    const result = await db.query(checkIfRatedQuery, [username, product]);

    if (result.rows[0]) {
      res.send({
        status: false,
        message: 'You already rated this product!',
      });
      return;
    }

    const createRatingQuery = `INSERT INTO rating (username, product, rating)
                                                VALUES ($1, $2, $3)`;

    await db.query(createRatingQuery, [username, product, rating]);

    res.send({status: true, message: 'Product successfully rated!'});
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getAvgRating = async (req, res) => {
  try {
    const {id} = req.query;

    const ratingQuery = `SELECT AVG(rating) as average_rating FROM rating 
                         WHERE product = $1 
                         GROUP BY product`;

    const result = await db.query(ratingQuery, [id]);

    res.send({
      status: true,
      data: result.rows[0],
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
