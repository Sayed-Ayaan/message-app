import express from 'express';
import {signup, login} from '../controllers/user.controller.js';
import { addFriend, friendRequest, deleteFriendRequest, acceptFriendRequst } from '../controllers/friends.controller.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login', login);
router.post('/addfriend', authenticateToken, addFriend);
router.get('/friendRequest', authenticateToken, friendRequest);
router.delete('/deleteFriendRequest', authenticateToken, deleteFriendRequest);
router.post('/acceptFriendRequest', authenticateToken, acceptFriendRequst);

export default router;