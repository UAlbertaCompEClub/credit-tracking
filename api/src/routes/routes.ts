import express, { NextFunction, Request, Response } from 'express';
import * as transactions from '../controllers/balances/transactions';
import * as users from '../controllers/users/users';


const router = express.Router();
router.post('/get-user', users.getUser);
router.get('/transactions', transactions.getTransactions);
router.post('/get-club-balance', transactions.getClubBalance);
router.post('/club', transactions.club);
router.get('/check-ccid', users.checkCcid);

export default router;