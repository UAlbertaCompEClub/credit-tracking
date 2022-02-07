import express, { NextFunction, Request, Response } from 'express';
import * as auth from '../../controllers/users/auth';
require('dotenv').config({ path: './src/auth/secret-key.env' });

const router = express.Router();
router.post('/login', auth.login);


export default router;