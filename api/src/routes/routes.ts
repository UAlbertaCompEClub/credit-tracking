import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../controllers/db/dbQueries';

import type * as schema from 'zapatos/schema';
import middleWare from '../controllers/controllers';
import { transaction } from 'zapatos/db';

const router = express.Router();



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


router.post('/get-user', async (req: Request, res: Response) => {
    const params = req.body;

    const User: schema.users.JSONSelectable[] = [];
    if (params.hasOwnProperty('ccid')) {
        console.log("inserted ccid");
        console.log(params.ccid);
        const queryParams = {
            ccid: params.ccid
        };
        const user = (await queries.getUser(queryParams))[0];
        user.subscribed
        const userCleaned = {
            ccid: user.ccid,
            isexec: user.isexec,
            active: user.active,
            full_name: user.full_name,
            subscribed: user.subscribed,
            balance: user.balance
        }
        res.status(200).json({
            body: userCleaned
        });
    }
    else if (params.hasOwnProperty('clubid')) {
        console.log("inserted clubid");
        const queryParams = {
            clubid: parseInt(params.clubid)
        };
        const usersGet = await queries.getUsers(queryParams);
        var users = Array();
        usersGet.forEach((element: schema.users.Selectable) => {
            users.push({
                ccid: element.ccid,
                full_name: element.full_name,
                isexec: element.isexec,
                balance: element.balance
            });
        });
        res.status(200).json({
            body: users
        });
    }
    else {
        const queryParams = {
            ccid: 'any',
        };
        const User = await queries.getUser(queryParams);
        res.status(200).json({
            body: User
        });
    }
});

async function buildUserTransactions(Transactions:schema.transactions.JSONSelectable[],ccid:any){
        //Organize transactions by club and compute totals
        //This is kinda un optimized - could be fixed with a 
        //query to find all club ids that a user has spent money in
        let clubs:any = {}
        for(let transaction of Transactions){
            if(clubs.hasOwnProperty(transaction.clubid)){  
                //Club has been added
            }else{
                //Club has not been added so add it
                clubs[transaction.clubid] = {transactions:[], balance:0};
            }
            //Add transaction and add to club balance
            clubs[transaction.clubid].transactions.push({
                date:transaction.created_at.slice(0,10),
                amount:transaction.amount,
                approver:transaction.created_by});
            clubs[transaction.clubid].balance = clubs[transaction.clubid].balance + transaction.amount;

        }
        //replace clubID with club name
        // for(let clubid of Object.keys(clubs) ){
        //     let clubData = await queries.getClubs({clubid:parseInt(clubid)})
        //     clubs[clubData[0].clubname] = clubs[clubid]
        //     delete clubs[clubid]
        // }
        
        let clubNameDict = Object()
        let clubData = await queries.getClubs();
        clubData.forEach((element: schema.clubs.JSONSelectable) => {
            clubNameDict[element.clubid] = element.clubname;
        });

        for (let clubid of Object.keys(clubs)) {
            clubs[clubNameDict[clubid]] = clubs[clubid];
            delete clubs[clubid];
        }

        let name= (await queries.getUser({'ccid':String(ccid)}))[0].full_name

        return {name:name,clubs:clubs}
}
function clean(Transactions:schema.transactions.JSONSelectable[]){
    //removes extra attributes in transactions and computes the net balance,
    //returning a new object with all data
    let club:any = {transactions: [], balance:0};
    for(let transaction of Transactions){        
        //Add transaction and add to club balance
        club.transactions.push({
            date:transaction.created_at.slice(0,10),
            amount:transaction.amount,
            approver:transaction.created_by});
        club.balance = club.balance + transaction.amount;
        console.log(transaction.created_by)
    }
    return club;
}

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
    //or all transactions for all users or all transactions for one club

    let params:any = {};
    if (req.get('ccid')){
        params['ccid'] = req.get('ccid')
    }
    if (req.get('clubid')){
        params['clubid'] = req.get('clubid')
    }
    console.log(params)
    
    let Transactions: schema.transactions.JSONSelectable[] = [];
    let transactions:any = {};
    if (params.hasOwnProperty('clubid') && params.hasOwnProperty('ccid')) {
         // Return transactions for one club for user

        const clubid:number = parseInt(params.clubid)
        
        const queryParams = {
            clubid: clubid,
            ccid: String(params.ccid)
        };
        
        Transactions = await queries.transactionsUser(queryParams);
        //Build data structure
        await buildUserTransactions(Transactions,params.ccid).then((res)=>{
            transactions = res
        })
        console.log("getting transactions for "+ params.ccid +"with club id "+clubid)
        console.log(Transactions)

    }
    else if (params.hasOwnProperty('clubid')) {
        const queryParams = {
            clubid: parseInt(String(params.clubid)),
            ccid: 'any'
        };
        transactions = await queries.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('ccid')) {
        // Return all transactions for all clubs for user
        const queryParams = {
            ccid: String(params.ccid),
            clubid: 0
        };
        
        Transactions = await queries.transactionsUser(queryParams);
        console.log(Transactions)
        await buildUserTransactions(Transactions,params.ccid).then((res)=>{
            transactions = res
        })
        transactions.clubs['All Clubs'] = clean(Transactions);

    }
    else {
        transactions = await queries.transactionsAll();
    }

    console.log(transactions);
    res.status(200).json({
        body: transactions
    });
});

router.post('/get-club-balance', async (req: Request, res: Response) => {
    const params = req.body;

    const User: schema.clubs.JSONSelectable[] = [];
    if (params.hasOwnProperty('club')) {
        const queryParams = {
            clubid: parseInt(params.club)
        };
        const User = await queries.clubBalance(queryParams);
    }
    else {
        const queryParams = {
            clubid: 0
        };
        const User = await queries.clubBalance(queryParams);
    }

    res.status(200).json({
        body: User
    });
});

router.post('/club', async (req: Request, res: Response) => {
    //returns all customers of a club in the format:
    // [{name:string,ccid:string,transactions:string}]
    //Headers should also contain exec token

    
    const clubid:any = req.body.clubid;
    console.log("club in router.get = " + clubid)

    let users:any;
    if(clubid == -1){
        users = await queries.getAllUsers();
    }else{
        users= await queries.getUsersRobust({clubid:clubid});
    }
    
    // console.log(users);
    let usersArray:any = []
    let usersHash:any = {}

    //Adding the transaction preview field. 
    for (let user in users){
        const userObj:any = users[user];
        let transactions:string = "";
        const allTrans:any = await queries.transactionsUser({clubid:clubid,ccid:userObj.ccid});
        
        //Get transaction priveiw string using first 3 transactions
        let counter:number = 0;
        for(let trans in allTrans){
            //add + or - signs
            const amount:number = allTrans[trans].amount;
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
        transactions = transactions + " ...";
        //build element and add it to array
        usersArray.push({ name:userObj.full_name, ccid:userObj.ccid, transactions:transactions, subscribed: userObj.subscribed});
    }


    res.status(200).json({
        body: usersArray
    });
});

router.get('/check-ccid', async (req:Request,res:Response) =>{
    const params = {ccid:String(req.get('ccid'))};
    const User = await queries.getUser(params);
    console.log(User)
    if(User.length == 0){
        //No user found
        res.status(200).json({
            body: -1
        });
    }else{
        res.status(200).json({
            body: (User[0].isexec? 1:0) //Return 1 if user is an exec, 0 if they are not
        });
    }
})

// router.get('/getClubs', async (req: Request, res: Response) => {
//     const clubs = await queries.getClubs({clubid:req.get('clubid')});
//     res.status(200).json({
//         body: clubs
//     });
// })


export default router;