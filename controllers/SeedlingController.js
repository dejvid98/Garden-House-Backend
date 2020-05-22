const db = require('../db');

exports.createSeedling = async (req, res) => {
  try {
    const {name, ownerid, nurseryid} = req.body;

    const seedlingQuery = `INSERT INTO seedling(
                            name,
                            owner_id,
                            nursery_id)
                        values($1, $2, $3)`;

    await db.query(seedlingQuery, [name, ownerid, nurseryid]);

    res.send({
      status: true,
      message: 'Seedling successfully created!',
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};
