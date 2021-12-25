import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './dbConnection';

const createTransaction = async (transactionParam: { ccid: string, clubid: number, amount: number; }) => {
    const transaction: schema.transactions.Insertable = {
        ccid: transactionParam.ccid,
        clubid: transactionParam.clubid,
        amount: transactionParam.amount,
        id: db.Default,
        created_at: db.Default
    };
    return db.insert('transactions', transaction).run(connection);
};

const transactionsUser = async (transaction: { clubid: number, ccid: string }) => {
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

const transactionsMonthly = async (transactionParam: { clubid: number, ccid: string}) => {
    var today = new Date()
    var oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth()-1);

    const dateUpper = today.toISOString().substring(0, 10);
    const dateLower = oneMonthAgo.toISOString().substring(0, 10);

    const query = db.sql<schema.transactions.SQL | schema.transactions.Selectable[]>`
        SELECT *
        FROM ${"transactions"} T
        WHERE T.created_at > now() - interval '1 month'
        AND T.ccid=${db.param(transactionParam.ccid)}
        AND T.clubid=${db.param(transactionParam.clubid)}
    `.run(connection);
    return query;
};

const transactionsAll = async () => {
    const where: schema.transactions.Whereable = {};
    return db.select('transactions', where).run(connection);
};

const getClubs = async () => {
    const where: schema.clubs.Whereable = {};
    return db.select('clubs', where).run(connection);
};

const clubBalance = async (queryParams: { clubid: number }) => {
    const where: schema.clubs.Whereable = {};
    if (queryParams.clubid !== 0) {
        where.clubid = queryParams.clubid;
    }
    // console.log(await db.select('transactions', where).run(connection));
    return db.select('clubs', where).run(connection);
};

const createUser = async (userParam: { ccid: string; full_name: string, foip: boolean; }) => {
    const user: schema.users.Insertable = {
        ccid: userParam.ccid,
        full_name: userParam.full_name,
        foip: userParam.foip,
        balance: 0
    };
    return db.insert('users', user).run(connection);
};

const getUser = async (userParam: { ccid: string }) => {
    const where: schema.users.Whereable = {};
    if (userParam.ccid !== 'any') {
        where.ccid = userParam.ccid;
    }
    // console.log(await db.select('transactions', where).run(connection));
    return db.select('users', where).run(connection);
};

const getExec = async (userParam: { ccid: string }) => {
    const where: schema.execs.Whereable = {};
    if (userParam.ccid !== 'any') {
        where.ccid = userParam.ccid;
    }
    return db.select('execs', where).run(connection);
};

const getUsers = async (userParam: { clubid: number }) => {
    const query = db.sql<schema.users.SQL | schema.transactions.SQL, schema.users.Selectable[]>`
        SELECT U.ccid, U.balance
        FROM ${"users"} U, ${"transactions"} T
        WHERE U.ccid=T.ccid AND T.clubid=${db.param(userParam.clubid)}
        GROUP BY U.ccid
        HAVING COUNT(T.clubid)>0
    `.run(connection);
    return query;
};

export {
    createTransaction,
    clubBalance,
    transactionsUser,
    getUser,
    getUsers,
    transactionsAll,
    createUser,
    getClubs,
    getExec,
    transactionsMonthly
};