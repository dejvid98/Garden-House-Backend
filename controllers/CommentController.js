const db = require('../db');

exports.createComment = async (req, res) => {
  try {
    const {id, user, comment} = req.body;

    const checkIfItemPurchased = `SELECT * FROM orderitem
                                  JOIN orders ON (orderitem.order_id = orders.id)
                                  WHERE shopitem_id = $1 AND buyer_id = $2 AND is_acepted = true`;

    const isPurchasedResult = await db.query(checkIfItemPurchased, [id, user]);

    if (isPurchasedResult.rows.length < 1) {
      res.send({status: false, message: 'You have not purchased this item'});
      return;
    }

    const checkIfCommentedQuery = `SELECT * FROM comment
                                    WHERE username = $1 AND product = $2`;

    const result = await db.query(checkIfCommentedQuery, [user, id]);

    if (result.rows[0]) {
      res.send({status: false, message: 'You already commented this product!'});
      return;
    }

    const createCommentQuery = `INSERT INTO comment (product, username, comment)
                                VALUES ($1, $2, $3)`;

    await db.query(createCommentQuery, [id, user, comment]);

    res.send({
      status: true,
      message: 'Comment successfully created!',
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const {id} = req.query;

    const commentsQuery = `SELECT * FROM comment WHERE product = $1`;

    const result = await db.query(commentsQuery, [id]);

    res.send({
      status: true,
      data: result.rows,
    });
  } catch (err) {
    res.send({status: false, message: err.message});
  }
};
