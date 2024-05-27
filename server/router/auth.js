import express from 'express';
import { signUp,logIn } from '../controllers/auth.js';
import rateLimiter from '../middleware/rateLimiter.js';


const router = express.Router();

router.post('/login',rateLimiter,logIn);
router.post('/signUp',rateLimiter,signUp);

export default router;