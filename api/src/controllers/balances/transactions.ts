import { Request, Response } from 'express';
import controller from '../util/controllerUtil';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import * as baseRepo from '../../repositories/base';

import type * as schema from 'zapatos/schema';
import { secureUser, secureExec } from '../util/middleware';
import { transaction } from 'zapatos/db';

require('dotenv').config({ path: './src/auth/secret-key.env' });

const buildUserTransactions = (async (Transactions: schema.transactions.JSONSelectable[], ccid: any) => {
    //Organize transactions by club and compute totals
    //This is kinda un optimized - could be fixed with a 
    //query to find all club ids that a user has spent money in
    let clubs: any = {}
    for (let transaction of Transactions) {
        if (clubs.hasOwnProperty(transaction.clubid)) {
            //Club has been added
        } else {
            //Club has not been added so add it
            clubs[transaction.clubid] = { transactions: [], balance: 0 };
        }
        //Add transaction and add to club balance
        clubs[transaction.clubid].transactions.push({
            date: transaction.created_at.slice(0, 10),
            amount: transaction.amount,
            approver: transaction.created_by
        });
        clubs[transaction.clubid].balance = clubs[transaction.clubid].balance + transaction.amount;

    }
    //replace clubID with club name
    let clubNameDict = Object()
    let clubData = await baseRepo.getClubs();
    clubData.forEach((element: schema.clubs.JSONSelectable) => {
        clubNameDict[element.clubid] = element.clubname;
    });

    for (let clubid of Object.keys(clubs)) {
        clubs[clubNameDict[clubid]] = clubs[clubid];
        delete clubs[clubid];
    }
    let name = (await baseRepo.getUser({ 'ccid': String(ccid) }))[0].full_name
    return { name: name, clubs: clubs }
});


const clean = ( async (Transactions: schema.transactions.JSONSelectable[]) => {
    //removes extra attributes in transactions and computes the net balance,
    //returning a new object with all data
    let club: any = { transactions: [], balance: 0 };
    for (let transaction of Transactions) {
        //Add transaction and add to club balance
        club.transactions.push({
            date: transaction.created_at.slice(0, 10),
            amount: transaction.amount,
            approver: transaction.created_by
        });
        club.balance = club.balance + transaction.amount;
        console.log(transaction.created_by)
    }
    return club;
});

const getTransactions = controller(async (req: Request, res: Response) => {
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
        
        Transactions = await baseRepo.transactionsUser(queryParams);
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
        transactions = await baseRepo.transactionsUser(queryParams);
    }
    else if (params.hasOwnProperty('ccid')) {
        // Return all transactions for all clubs for user
        const queryParams = {
            ccid: String(params.ccid),
            clubid: 0
        };
        
        Transactions = await baseRepo.transactionsUser(queryParams);
        console.log(Transactions)
        await buildUserTransactions(Transactions,params.ccid).then((res)=>{
            transactions = res
        })
        transactions.clubs['All Clubs'] = clean(Transactions);

    }
    else {
        transactions = await baseRepo.transactionsAll();
    }

    console.log(transactions);
    res.status(200).json({
        body: transactions
    });
});

const getClubBalance = controller(async (req: Request, res: Response) => {
    const params = req.body;
    const User: schema.clubs.JSONSelectable[] = [];
    if (params.hasOwnProperty('club')) {
        const queryParams = {
            clubid: parseInt(params.club)
        };
        const User = await baseRepo.clubBalance(queryParams);
    }
    else {
        const queryParams = {
            clubid: 0
        };
        const User = await baseRepo.clubBalance(queryParams);
    }

    res.status(200).json({
        body: User
    });

});

const club = controller(async (req: Request, res: Response) => {
    //returns all customers of a club in the format:
    // [{name:string,ccid:string,transactions:string}]
    //Headers should also contain exec token


    const clubid: any = req.body.clubid;
    console.log("club in router.get = " + clubid)

    let users: any;
    if (clubid == -1) {
        users = await baseRepo.getAllUsers();
    } else {
        users = await baseRepo.getUsersRobust({ clubid: clubid });
    }

    // console.log(users);
    let usersArray: any = []
    let usersHash: any = {}

    //Adding the transaction preview field. 
    for (let user in users) {
        const userObj: any = users[user];
        let transactions: string = "";
        const allTrans: any = await baseRepo.transactionsUser({ clubid: clubid, ccid: userObj.ccid });

        //Get transaction priveiw string using first 3 transactions
        let counter: number = 0;
        for (let trans in allTrans) {
            //add + or - signs
            const amount: number = allTrans[trans].amount;
            let amountString: string = '';
            if (amount >= 0) {
                amountString = '+' + amount;
            } else {
                amountString = amount.toString();
            }


            transactions = transactions + amountString + ", ";
            if (counter == 2) {
                break;
            }
            counter++;
        }
        transactions = transactions + " ...";
        //build element and add it to array
        usersArray.push({ name: userObj.full_name, ccid: userObj.ccid, transactions: transactions, subscribed: userObj.subscribed });
    }
    res.status(200).json({
        body: usersArray
    });
});

const createTransaction = secureExec(async (req: Request, res: Response) => {
    const params = req.body;

    new Promise<void>((resolve) => {
        resolve();
        console.log('transaction creation process begin!')
    })
        .then(async () => {
            const params = req.body;
            if (params.hasOwnProperty('ccid')) {
                const queryParams = {
                    ccid: params.ccid,
                    clubid: parseInt(params.clubid),
                    amount: parseFloat(params.amount),
                    exec: params.exec
                };
                await baseRepo.createTransaction(queryParams);
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

export {
    getTransactions,
    getClubBalance,
    club,
    createTransaction
}