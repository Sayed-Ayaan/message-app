import pool from '../db.js'

async function addFriend(req, res) {
  try {
    const { sender, receiver } = req.body;
    if (!sender || !receiver) {
      return res.status(400).json({ error: "Sender or Reciever is missing", });
    };

    let text = `SELECT * FROM users WHERE username = $1`;
    const senderQuery = await pool.query(text, [sender]);
    const receiverQuery = await pool.query(text, [receiver]);

    if (senderQuery.rows.length == 0 || receiverQuery.rows.length == 0) {
      return res.status(404).json({ error: 'Sender or reciever not found', });
    };

    text = `SELECT * FROM user_requests WHERE sender_id = $1 AND receiver_id = $2`;
    const values = [senderQuery.rows[0].id, receiverQuery.rows[0].id];

    const checkIfExists = await pool.query(text, values);
    if (checkIfExists.rows.length !== 0) {
      return res.status(403).json({ error: 'You have already send request to the above user!', });
    }

    text = `INSERT INTO user_requests(sender_id, receiver_id) VALUES($1,$2) RETURNING *`;
    await pool.query(text, values);

    return res.status(200).json({ message: 'Request successfully send!', });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  };
};

export { addFriend };