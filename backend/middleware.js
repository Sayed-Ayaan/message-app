import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authenticateToken(req, res, next) {
   const token = req.cookies.accessToken; 

  if (!token) {
    return res.status(401).json({ error: 'Please Login Again!' });
  }
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({error: 'Token is not valid!'});
    req.user = user;
    next();
  });
}

