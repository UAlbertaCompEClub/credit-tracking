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
    const getUsers = await queries.getUsers({ club: 'CompE' });

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
    else if (params.hasOwnProperty('club')) {
        const queryParams = {
            club: params.get("club")
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
            club: params.get("club"),
            ccid: params.get("ccid")
        };
        const Transactions = await queries.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('club')) {
        const queryParams = {
            club: params.get("club"),
            ccid: 'any'
        };
        const Transactions = await queries.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('ccid')) {
        const queryParams = {
            ccid: params.get("ccid"),
            club: 'any'
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
            name: params.get("club")
        };
        const User = await queries.clubBalance(queryParams);
    }
    else {
        const queryParams = {
            name: 'any'
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
router.post('/add-user', (req: Request, res: Response) => {
    res.send('Hello World!')
});

router.post('/transaction', (req: Request, res: Response) => {
    res.send('Hello World!');
});

router.post('/login', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default router;