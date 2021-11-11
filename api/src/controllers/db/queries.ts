import { Pool, Client } from 'pg';
import connection from './api';

function makeTransaction(transaction: { club: String; amount: Number; }) {
    connection.query(`INSERT INTO transactions(id, club, created_at, amount)
    VALUES(DEFAULT, ${transaction.club}, DEFAULT, ${transaction.amount});`, (err, res) => {
        console.log(err, res)
    });
}

function clubBalances(queryParams: { club: String; amount: Number; }) {
    connection.query(`INSERT INTO transactions(id, club, created_at, amount)
    VALUES(DEFAULT, ${queryParams.club}, DEFAULT, ${queryParams.amount});`, (err, res) => {
        console.log(err, res)
    });
}


export default {
    makeTransaction
};