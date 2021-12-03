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
    // Return transactions for one or all clubs for user packaged as: 
        // {  name: ,
        //     clubs: {
        //         clubName1:{
        //             transactions:{
        //                 date: ,
        //                 amount: 
        //             },
        //             balance: 
        //         }
        //     } }



    const params = {ccid:req.get('ccid'),clubid:req.get('clubid')}

    let Transactions: schema.transactions.JSONSelectable[] = [];
    let clubs: any;
    if (params.hasOwnProperty('clubid') && params.hasOwnProperty('ccid')) {
         // Return transactions for one club for user

        const queryParams = {
            clubid: parseInt(String(params.clubid)),
            ccid: String(params.ccid)
        };
        Transactions = await queries.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('clubid')) {
        const queryParams = {
            clubid: parseInt(String(params.clubid)),
            ccid: 'any'
        };
        Transactions = await queries.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('ccid')) {
        // Return all transactions for all clubs for user
        
        const queryParams = {
            ccid: String(params.ccid),
            clubid: 0
        };
        Transactions = await queries.transactionsUser(queryParams);
    }
    else {
        Transactions = await queries.transactionsAll();
    }

    let name = queries.getUser({'ccid':String(params.ccid)})
    
    res.status(200).json({
        body: {name:(params.hasOwnProperty('ccid')?name:"All"),clubs:clubs}
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

router.get('/club', async (req: Request, res: Response) => {
    //returns all customers of a club in the format:
    // [{name:string,ccid:string,transactions:string}]
    //Headers should also contain exec token

    
    const clubid:any = req.get('clubid');
    console.log("club in router.get = " + clubid)

    const users:any = await queries.getUsersRobust({clubid:clubid});
    console.log(users);
    let usersArray:any = []

    //Adding the transaction preview field. 
    for (let user in users){
        const userObj:any = users[user];
        let transactions:string = "";
        const allTrans:any = await queries.transactionsUser({clubid:clubid,ccid:userObj.ccid});
        
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
router.post('/transaction', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default router;