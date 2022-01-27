import express, { NextFunction, Request, Response } from 'express';
import * as forgotPass from '../../controllers/users/forgotPass';

const router = express.Router();

router.post('/forgot-password', forgotPass.resetEmail);
router.post('/email-reset', forgotPass.resetCodeEntry);


export default router;