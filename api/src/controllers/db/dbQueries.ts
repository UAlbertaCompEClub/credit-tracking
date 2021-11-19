import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './dbConnection';

const createTransaction = async (transactionParam: { ccid: string, club: string, amount: number; }) => {
    const transaction: schema.transactions.Insertable = {
        ccid: transactionParam.ccid,
        club: transactionParam.club,
        amount: transactionParam.amount,
        id: db.Default,
        created_at: db.Default
    };
    return db.insert('transactions', transaction).run(connection);
};

const transactionsUser = async (transaction: { club: string, ccid: string}) => {
    const where: schema.transactions.Whereable = {};
    if (transaction.club !== 'any') {
        where.ccid = transaction.ccid;
    }
    if (transaction.ccid !== 'any') {
        where.club = transaction.club;
    }
    return db.select('transactions', where).run(connection);
};

const transactionsAll = async () => {
    const where: schema.transactions.Whereable = {};
    return db.select('transactions', where).run(connection);
};

const clubBalance = async (queryParams: { name: string }) => {
    const where: schema.clubs.Whereable = {};
    if (queryParams.name !== 'any') {
        where.name = queryParams.name;
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

const getUser = async (userParam: { ccid: string}) => {
    const where: schema.users.Whereable = {};
    if (userParam.ccid !== 'any') {
        where.ccid = userParam.ccid;
    }
    // console.log(await db.select('transactions', where).run(connection));
    return db.select('users', where).run(connection);
};

const getUsers = async (userParam: { club: string }) => {
    const query = db.sql<schema.users.SQL | schema.transactions.SQL, schema.users.Selectable[]>`
        SELECT U.ccid, U.balance
        FROM ${"users"} U, ${"transactions"} T
        WHERE U.ccid=T.ccid AND T.club=${db.param(userParam.club)}
        GROUP BY U.ccid
        HAVING COUNT(T.club)>0
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
    createUser
};