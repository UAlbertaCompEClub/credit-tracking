import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbQueries';
import { verifyToken } from '../../auth/auth';
import jwt from 'jsonwebtoken';
import assert from 'assert';

require('dotenv').config({ path: './src/auth/secret-key.env' });


const router = express.Router();

router.post('/transaction', async (req: Request, res: Response) => {
    const params = req.body;

    new Promise<void>((resolve) => {
        resolve();
        console.log('transaction creation process begin!')
    })
        .then(async () => {
            const params = req.body;
            const token = params.token;
            assert(token !== undefined && token !== null);

            console.log('token', token);
            console.log(params);

            let key = process.env.SECRETKEY;
            assert(key !== undefined && key !== null);

            //checks if user is verified
            verifyToken(token, key);

            if (params.hasOwnProperty('ccid')) {
                const queryParams = {
                    ccid: params.ccid,
                    clubid: parseInt(params.clubid),
                    amount: parseInt(params.amount),
                    exec: params.exec
                };
                await queries.createTransaction(queryParams);
            }

        })
        .then(data =>
            res.status(200).json({
                status: 0
            })
        )
        .catch(data =>
            res.status(400).json({
                status: -1
            })
        );
});

// // POST REQUESTS
// router.post('/transaction', async (req: Request, res: Response) => {
//     const params = req.body;
//     console.log(params)

//     const Transactions: schema.transactions.JSONSelectable[] = [];
//     if (params.ccid) {
//         const queryParams = {
//             ccid:params.ccid,
//             clubid: parseInt(params.clubid),
//             amount: parseInt(params.amount)
//         };
//         await queries.createTransaction(queryParams);
//     }

    
//     res.status(200).json({
//         status:0 //return the balance
//     });
// });



export default router;