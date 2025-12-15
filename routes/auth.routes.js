import express from 'express';
import { createUser,  logout, profile, userLogin } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', userLogin);
userRouter.get('/',authMiddleware,profile);
userRouter.post('/logout',logout);






export default userRouter;
