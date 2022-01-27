import express, { NextFunction, Request, Response } from 'express';
import * as transactions from '../controllers/balances/transactions';
import * as users from '../controllers/users/users';


const router = express.Router();
router.post('/club', transactions.club);

export default router;