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

    if (senderQuery.rows.length === 0 || receiverQuery.rows.length === 0) {
      return res.status(404).json({ error: 'Sender or reciever not found', });
    };

    text = `SELECT * FROM user_requests WHERE sender_id = $1 AND receiver_id = $2`;
    const values = [senderQuery.rows[0].id, receiverQuery.rows[0].id];

    const checkIfExists = await pool.query(text, values);
    if (checkIfExists.rows.length !== 0) {
      return res.status(403).json({ error: 'You have already send request to the above user!', });
    }

    text = `SELECT * FROM friends WHERE user1 = $1 AND user2 = $2`;
    const checkValues = [senderQuery.rows[0].id, receiverQuery.rows[0].id].sort((a, b) => a - b);
    const checkAlreadyFriend = await pool.query(text, checkValues);
    if (checkAlreadyFriend.rowCount !== 0) {
      return res.status(403).json({ error: 'You are already friends with the above user!', });
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

async function friendRequest(req, res) {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'User not provided' });
    }
    let text = `SELECT * FROM users WHERE username=$1`;
    const user = await pool.query(text, [username]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const receiverId = user.rows[0].id;
    text = `SELECT user_requests.sender_id, users.username
            FROM user_requests
            JOIN users ON user_requests.sender_id = users.id
            WHERE user_requests.receiver_id=$1`;
    const requests = await pool.query(text, [receiverId]);
    res.status(200).json({ friends: requests.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' })
  }
}

async function deleteFriendRequest(req, res) {
  try {
    const senderID = req.query.senderID;
    const receiverUsername = req.query.username;

    let text = `SELECT id FROM users WHERE username=$1`;
    const receiver = await pool.query(text, [receiverUsername]);
    if (receiver.rowCount === 0) {
      return res.status(404).json({ error: 'User not Found' });
    }

    text = `DELETE FROM user_requests WHERE sender_id=$1 AND receiver_id=$2`;
    const deleteReq = await pool.query(text, [senderID, receiver.rows[0].id]);
    if (deleteReq.rowCount === 0) {
      return res.status(404).json({ error: 'No friend request found to delete' });
    }
    res.status(200).json({ message: 'Successful', deleteReq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' })
  }
}

async function acceptFriendRequst(req, res) {
  try {
    const { username, senderID } = req.body;
    let text = `SELECT * FROM users WHERE username=$1`;
    const user = await pool.query(text, [username]);
    if (user.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    };

    text = `SELECT * FROM users WHERE id=$1`;
    const senderExits = await pool.query(text, [senderID]);
    if (senderExits.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    };

    const userID = user.rows[0].id;
    text = `INSERT INTO friends (user1, user2) VALUES ($1, $2)  RETURNING *`;
    const values = [userID, senderID].sort((a, b) => a - b);
    const acceptRequest = await pool.query(text, values);

    text = `DELETE FROM user_requests WHERE sender_id=$1 AND receiver_id=$2`;
    await pool.query(text, [senderID, userID]);
    await pool.query(text, [userID, senderID]);
    res.status(200).json({ message: 'Friend Request Accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export { addFriend, friendRequest, deleteFriendRequest, acceptFriendRequst };