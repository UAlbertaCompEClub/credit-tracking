import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'

import routes from './routes/routes';
import middleware from './controllers/middleware';

require('dotenv').config({ path: 'db.env' });

console.log("DB ACCESS\n",
"USER:", process.env.PGUSER, "\n",
"HOST:", process.env.PGHOST, "\n",
"PASS:", process.env.PGPASSWORD, "\n",
"DB_NAME:", process.env.PGDATABASE, "\n",
"PORT:", process.env.PGPORT);

import * as queries from './controllers/db/dbQueries';

const router = express();
const port = process.env.PORT || "8000";


/**
 *  App Configuration
 */


// router.set("views", path.join(__dirname, "views"));
// router.use(express.static(path.join(__dirname, "public")));
router.use(middleware.bodyParser());
router.use(middleware.consoleDisplay());
router.use(middleware.cors_call());


/**
 * Routes Definitions
 */
router.use('/api/v1', routes);
router.get('/add-entry', (req: Request, res: Response) => {
    res.send('Hello World!')
});
router.get('/test-db', async (req: Request, res: Response) => {
    // const transactions = await transactionsUser({ club: 'CompE', ccid: 'mfiaz' });
    const getUsers = await queries.getUsers({ club: 'CompE'});
    
    res.status(200).json({
        body: getUsers
    });
    // res.send('Hello World!')
});


/**
 * Server Activation
 */

router.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});