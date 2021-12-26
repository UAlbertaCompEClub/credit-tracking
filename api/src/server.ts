import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'

import routes from './routes/routes';
import userRoutes from './routes/auth/users';
import authRoutes from './routes/auth/login';
import transactionRoutes from './routes/auth/transaction';
import middleware from './controllers/middleware';

import { computeActiveUsers, tick }  from './sync/queue';
import { resetSendLimit, initializeState } from './sync/state';

import * as queries from './controllers/db/dbQueries';

require('dotenv').config({ path: 'db.env' });

console.log("DB ACCESS\n",
"USER:", process.env.PGUSER, "\n",
"HOST:", process.env.PGHOST, "\n",
"PASS:", process.env.PGPASSWORD, "\n",
"DB_NAME:", process.env.PGDATABASE, "\n",
"PORT:", process.env.PGPORT);


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
router.use('/api/v1', userRoutes);
router.use('/api/v1', authRoutes);
router.use('/api/v1', transactionRoutes);

//set up server state
initializeState();

//timed method set-up
setInterval(tick, 24*3600000);
// setInterval(tick, 20000);
setInterval(computeActiveUsers, 24*3600000);
setInterval(resetSendLimit, 3600000);


router.get('/test-db', async (req: Request, res: Response) => {
    // const transactions = await transactionsUser({ club: 'CompE', ccid: 'mfiaz' });
    const getUsers = await queries.getUsers({ clubid: 1 });
    
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