import express from 'express';
import { signUp,logIn } from '../controllers/auth.js';
import rateLimiter from '../middleware/rateLimiter.js';


const router = express.Router();

router.get('/login',rateLimiter,logIn);
router.get('/signUp',signUp);

export default router;