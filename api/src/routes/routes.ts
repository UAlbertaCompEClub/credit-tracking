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

router.get('/club', async (req: Request, res: Response) => {
    //returns all customers of a club in the format:
    // [{name:string,ccid:string,transactions:string}]
    //Headers should also contain exec token

    
    const club:any = req.get('club');
    console.log("club in router.get = " + club)

    const users:any = await queries.getUsersRobust({club:club});
    console.log(users);
    let usersArray:any = []

    //Adding the transaction preview field. 
    for (let user in users){
        const userObj:any = users[user];
        let transactions:string = "";
        const allTrans:any = await queries.transactionsUser({club:club,ccid:userObj.ccid});
        
        //Get transaction priveiw string using first 3 transactions
        let counter:number = 0;
        for(let trans in allTrans){
            //add + or - signs
            const amount:number = allTrans[trans].amount
            let amountString:string = '';
            if(amount >= 0){
                amountString = '+' + amount;
            }else{
                amountString = amount.toString();
            }


            transactions = transactions + amountString+ ", ";
            if(counter == 2){
                break;
            }
            counter++;
        }
        transactions = transactions + " ..."

        //build element and add it to array
        usersArray.push({name:userObj.full_name,ccid:userObj.ccid,transactions:transactions})
    }


    res.status(200).json({
        body: usersArray
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