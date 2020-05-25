const db = require('../db');

exports.createComment = async (req, res) => {
  try {
    const {id, user, comment} = req.body;

    const checkIfCommentedQuery = `SELECT * FROM comment 
                                    WHERE username = $1 AND product = $2`;

    const result = await db.query(checkIfCommentedQuery, [user, comment]);

    if (result.rows[0]) {
      res.send({status: false, message: 'You already commented this product!'});
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
