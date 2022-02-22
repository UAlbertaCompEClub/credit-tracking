import { Pool } from 'pg';

// const connection = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.DBPORT as unknown as number
// })

const connection = ():Pool => {
    let connection = new Pool();
    if (process.env.DATABASE_URL) {
        connection = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    return connection;
}

export default connection;