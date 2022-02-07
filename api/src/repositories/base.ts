import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './connection';

const createTransaction = (transactionParam: { ccid: string, clubid: number, amount: number, exec: string; }) => {
    const transaction: schema.transactions.Insertable = {
        ccid: transactionParam.ccid,
        clubid: transactionParam.clubid,
        amount: transactionParam.amount,
        id: db.Default,
        created_at: db.Default,
        created_by: transactionParam.exec,
    };
    console.log("creating Transaction at the query level...")
    return db.insert('transactions', transaction).run(connection);
};

const transactionsUser = (transaction: { clubid: number, ccid: string }) => {
    const where: schema.transactions.Whereable = {};
    if (transaction.clubid === 0 && transaction.ccid === 'any') {
    }
    else if (transaction.clubid === 0 && transaction.ccid !== 'any') {
        where.ccid = transaction.ccid;
    }
    else if (transaction.clubid !== 0 && transaction.ccid === 'any') {
        where.clubid = transaction.clubid;
    }
    else if (transaction.clubid !== 0 && transaction.ccid !== 'any') {
        where.ccid = transaction.ccid;
        where.clubid = transaction.clubid;
    }
    return db.select('transactions', where).run(connection);
};

const transactionUserWeekly = (transactionParam: { clubid: number, ccid: string}) => {
    var today = new Date()
    var oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth()-1);

    const dateUpper = today.toISOString().substring(0, 10);
    const dateLower = oneMonthAgo.toISOString().substring(0, 10);

    const query = db.sql<schema.transactions.SQL | schema.transactions.Selectable[]>`
        SELECT *
        FROM ${"transactions"} T
        WHERE T.created_at > now() - interval '1 week'
        AND T.ccid=${db.param(transactionParam.ccid)}
        AND T.clubid=${db.param(transactionParam.clubid)}
    `.run(connection);
    return query;
};

const transactionsAll = () => {
    const where: schema.transactions.Whereable = {};
    return db.select('transactions', where).run(connection);
};

const getClub = ( queryParams: {clubid: number}) => {
    const where: schema.clubs.Whereable = {
        clubid: queryParams.clubid
    };
    return db.select('clubs', where).run(connection);
};

const getClubs = () => {
    const where: schema.clubs.Whereable = {};
    return db.select('clubs', where).run(connection);
};

const clubBalance = (queryParams: { clubid: number }) => {
    const where: schema.clubs.Whereable = {};
    if (queryParams.clubid !== 0) {
        where.clubid = queryParams.clubid;
    }
    
    return db.select('clubs', where).run(connection);
};

const getUser = (userParam: { ccid: string }) => {
    const where: schema.users.Whereable = {};
    if (userParam.ccid !== 'any') {
        where.ccid = userParam.ccid;
    }
    // console.log(await db.select('transactions', where).run(connection));
    return db.select('users', where).run(connection);
};

const getExec = (userParam: { ccid: string }) => {
    const where: schema.execs.Whereable = {};
    if (userParam.ccid !== 'any') {
        where.ccid = userParam.ccid;
    }
    return db.select('execs', where).run(connection);
};

const getUsers = (userParam: { clubid: number }) => {
    const query = db.sql<schema.users.SQL | schema.transactions.SQL, schema.users.Selectable[]>`
        SELECT U.ccid, U.balance
        FROM ${"users"} U, ${"transactions"} T
        WHERE U.ccid=T.ccid AND T.clubid=${db.param(userParam.clubid)}
        GROUP BY U.ccid
        HAVING COUNT(T.clubid)>0
    `.run(connection);
    return query;
};
const getUsersRobust = async (userParam: { clubid: string }) => {
    // console.log("club = " + userParam.club)
    const query = db.sql<schema.users.SQL | schema.transactions.SQL, schema.users.Selectable[]>`
        SELECT U.ccid, U.full_name, U.balance, U.subscribed
        FROM ${"users"} U, ${"transactions"} T
        WHERE U.ccid=T.ccid AND T.clubid=${db.param(userParam.clubid)}
        GROUP BY U.ccid, U.full_name
        HAVING COUNT(T.clubid)>0
    `.run(connection);
    return query;
};

const getAllUsers = async () => {
    // console.log("club = " + userParam.club)
    const query = db.sql<schema.users.SQL | schema.transactions.SQL, schema.users.Selectable[]>`
        SELECT U.ccid, U.full_name, U.balance, U.subscribed
        FROM ${"users"} U
        GROUP BY U.ccid, U.full_name
    `.run(connection);
    return query;
};

export {
    createTransaction,
    clubBalance,
    transactionsUser,
    getUser,
    getUsers,
    getUsersRobust,
    transactionsAll,
    getClub,
    getClubs,
    getExec,
    transactionUserWeekly,
    getAllUsers
};