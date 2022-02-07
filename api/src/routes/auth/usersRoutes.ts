import express, { NextFunction, Request, Response } from 'express';
import * as users from '../../controllers/users/users';
import * as forgotPass from '../../controllers/users/forgotPass';

const router = express.Router();

router.post('/get-user', users.getUser);
router.post('/user', users.createUser);
router.post('/set-subscribed', users.setSubscribed);
router.get('/check-ccid', users.checkCcid);

export default router;