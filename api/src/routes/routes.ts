import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../controllers/db/dbQueries';

import type * as schema from 'zapatos/schema';
import middleWare from '../controllers/controllers';

export const router = express.Router();



// GET REQUESTS
// router.get('/say-something', (req, res) => {
//         res.send('did the json send?');
//         middleWare.saySomething;
//     });

router.get('/test', (req: Request, res: Response) => {
    // res.send('Hello World!')
    res.status(200).json({
        body: {message:'Hello from the server!'}
    });
});

router.get('/test-db', async (req: Request, res: Response) => {
    // const transactions = await transactionsUser({ club: 'CompE', ccid: 'mfiaz' });
    const getUsers = await queries.getUsers({ clubid: 1 });

    // const getUsers = await queries.createUser({ ccid: 'rachel', full_name: 'rachel', foip: true});
    // const getUsers = await queries.createUser({ ccid: 'mfiaz', full_name: 'muhammad fiaz', foip: true });

    // const getUsers = await userOps.createExec({ ccid: 'mfiaz', password: 'password', clubid: 1 });

    res.status(200).json({
        body: getUsers
    });
    // res.send('Hello World!')
});


router.get('/user', async (req: Request, res: Response) => {
    const params = res.json(req.body);

    const User: schema.users.JSONSelectable[] = [];
    if (params.hasOwnProperty('ccid')) {
        const queryParams = {
            ccid: params.get("ccid")
        };
        const User = await queries.getUser(queryParams);
    }
    else if (params.hasOwnProperty('clubid')) {
        const queryParams = {
            clubid: parseInt(params.get("clubid"))
        };
        const User = await queries.getUsers(queryParams);
    }
    else {
        const queryParams = {
            ccid: 'any',
        };
        const User = await queries.getUser(queryParams);
    }

    res.status(200).json({
        body: User
    });
});


router.get('/transactions', async (req: Request, res: Response) => {
    const params = res.json(req.body);

    const Transactions: schema.transactions.JSONSelectable[] = [];
    if (params.hasOwnProperty('club') && params.hasOwnProperty('ccid')) {
        const queryParams = {
            clubid: parseInt(params.get("clubid")),
            ccid: params.get("ccid")
        };
        const Transactions = await queries.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('clubid')) {
        const queryParams = {
            clubid: parseInt(params.get("clubid")),
            ccid: 'any'
        };
        const Transactions = await queries.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('ccid')) {
        const queryParams = {
            ccid: params.get("ccid"),
            clubid: 0
        };
        const Transactions = await queries.transactionsUser(queryParams);
    }
    else {
        const Transactions = await queries.transactionsAll();
    }

    res.status(200).json({
        body: Transactions
    });
});

router.get('/club-balance', async (req: Request, res: Response) => {
    const params = res.json(req.body);

    const User: schema.clubs.JSONSelectable[] = [];
    if (params.hasOwnProperty('club')) {
        const queryParams = {
            clubname: params.get("club")
        };
        const User = await queries.clubBalance(queryParams);
    }
    else {
        const queryParams = {
            clubname: 'any'
        };
        const User = await queries.clubBalance(queryParams);
    }

    res.status(200).json({
        body: User
    });
});

router.get ('/checkCcid', (req:Request,res:Response) =>{
    res.send()
})


// POST REQUESTS
router.post('/transaction', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default router;