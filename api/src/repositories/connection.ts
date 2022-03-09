import { Pool } from 'pg';

// const connection = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const connection = new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
    //make sure you comment out the ssl entry for this Pool in dev environment
    ssl: {
        rejectUnauthorized: false
    }
});


export default connection;