import { Pool, Client } from 'pg';

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "credit-tracking",
    password: "root",
    port: 5432
})