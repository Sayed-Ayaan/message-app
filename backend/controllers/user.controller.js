import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import pool from '../db.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signup = [
  body('username')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Username must not be empty.')
    .isAlphanumeric()
    .withMessage("Username must only contain alphabets or numbers.")
    .custom(async value => {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [value]);
      if (user.rows.length > 0)
        throw new Error('Username is already taken.')
    }),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must not be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),

  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(400).json({
          errors: error.array(),
        });
        return;
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const text = 'INSERT INTO users(username, password) VALUES($1,$2) RETURNING *';
        const values = [username, hashedPassword];
        const newUser = await pool.query(text, values);
        return res.status(201).json({
          message: `User ${username} created successfully,`
        })
      };

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error!' })
    }
  }
];

const login = [
  body('username')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Username must not be empty.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must not be empty'),


  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const text = 'SELECT * FROM users WHERE username=$1';
      const user = await pool.query(text, [username]);

      if (user.rows.length == 0) {
        return res.status(401).json({
          errors: { msg: "User does not exists" }
        });
      }

      const checkPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!checkPassword) {
        return res.status(401).json({
          errors: { msg: "Incorrect Password" }
        });
      }

      const access_token = jwt.sign({ id: user.rows[0].id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
      res.cookie('accessToken', access_token, {
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 3600000,
      });
      return res.status(200).json({
        username,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error!' })
    }
  }
];

export { signup, login };