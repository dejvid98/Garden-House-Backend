const db = require('../db');

exports.createComment = async (req, res) => {
  try {
    const {id, user, comment} = req.body;

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
