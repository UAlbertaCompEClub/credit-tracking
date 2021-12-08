import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbQueries';
import jwt from 'jsonwebtoken';
import assert from 'assert';

require('dotenv').config({ path: './src/auth/secret-key.env' });


export const router = express.Router();

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
            key = key || '';

            //checks if user is verified
            const verified = jwt.verify(token, key, (err: any, data: any) => {
                if (err) {
                    console.log("User not Verified!");
                    throw new Error("");
                }
            });

            if (params.hasOwnProperty('ccid')) {
                const queryParams = {
                    ccid: params.ccid,
                    clubid: parseInt(params.clubid),
                    amount: parseInt(params.amount)
                };
                await queries.createTransaction(queryParams);
            }

        })
        .then(data =>
            res.status(200).json({
                body: 1
            })
        )
        .catch(data =>
            res.status(400).json({
                body: -1
            })
        );
});


export default router;