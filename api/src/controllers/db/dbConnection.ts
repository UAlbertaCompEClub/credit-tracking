import { Pool, Client } from 'pg';

// const connection = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.DBPORT as unknown as number
// })

const connection = new Pool();

export default connection;