import express from 'express';
import authenticateToken from '../middleware.js';
import { getDms } from '../controllers/dm.controller.js';

const router = express.Router();

router.get('/dms',authenticateToken, getDms);


export default router;