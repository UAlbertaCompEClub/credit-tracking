import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'

import routes from './routes/routes';
import middleware from './controllers/middleware';

require('dotenv').config({ path: 'db.env' });

console.log("DB ACCESS:")
console.log("USER", process.env.PGUSER);
console.log("HOST", process.env.PGHOST);
console.log("PASS", process.env.PGPASSWORD);
console.log("DB_NAME", process.env.PGDATABASE);
console.log("PORT", process.env.PGPORT);

import { makeTransaction, clubBalances } from './controllers/db/queries';

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


/**
 * Server Activation
 */

router.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});