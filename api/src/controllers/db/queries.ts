import { Pool, Client } from 'pg';
import connection from './api';

function query1() {
    connection.query("INSERT INTO test(column1)VALUES(1)", (err, res) => {
        console.log(err, res)
    });
}

export default query1;