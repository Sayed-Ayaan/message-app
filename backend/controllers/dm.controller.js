import pool from '../db.js';

async function getDms(req, res) {
  try {
    const username = req.query.username;
    let text = `SELECT id FROM users WHERE username=$1`;
    const user = await pool.query(text, [username]);

    if (user.rowCount === 0) 
      return res.status(404).json({error: 'User not found'});
    
    const userid = user.rows[0].id;

    text = `SELECT u.username as username, u.id as id  
            FROM friends f
            JOIN users u
            ON u.id = CASE
              WHEN f.user1 = $1 THEN f.user2
              WHEN f.user2 = $1 THEN f.user1
            END
            WHERE $1 IN (f.user1, f.user2)`;

    const dm = await pool.query(text, [userid]);
    res.status(200).json({dms:dm.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' })
  }

};

export { getDms };