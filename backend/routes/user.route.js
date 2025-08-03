import express from 'express';
import {signup, login} from '../controllers/user.controller.js';
import { addFriend } from '../controllers/friends.controller.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login', login);
router.post('/addfriend', authenticateToken, addFriend);

export default router;