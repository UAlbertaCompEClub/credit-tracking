import express, { NextFunction, Request, Response } from 'express';
import * as transactions from '../../controllers/balances/transactions';
import * as users from '../../controllers/users/users';


const router = express.Router();
router.post('/transaction', transactions.createTransaction);
router.get('/transactions', transactions.getTransactions);
router.post('/get-club-balance', transactions.getClubBalance);

export default router;