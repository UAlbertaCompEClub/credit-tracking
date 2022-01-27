import express, { NextFunction, Request, Response } from 'express';
import * as users from '../../controllers/users/users';
import * as forgotPass from '../../controllers/users/forgotPass';

const router = express.Router();

router.post('/user', users.createUser);
router.post('/set-subscribed', users.setSubscribed);
router.post('/update-password', forgotPass.updatePass);

export default router;