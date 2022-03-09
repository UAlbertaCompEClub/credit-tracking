import express, { Request, Response } from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'
import fs from 'fs';

import routes from './routes/routes';
import userRoutes from './routes/auth/usersRoutes';
import authRoutes from './routes/auth/loginRoutes';
import transactionRoutes from './routes/auth/transactionRoutes';
import forgotPassRoutes from './routes/forgotPassword/passwordRoutes';
import middleware from './controllers/util/middleware';

import { initializeState } from './sync/state';
import { hourlyRun } from './sync/sync';

import * as queries from './repositories/base';

require('dotenv').config({ path: 'api.env' });

console.log(
    "DB ACCESS \n",
    "USER:", process.env.PGUSER, "\n",
    "HOST:", process.env.PGHOST, "\n",
    "PASS:", process.env.PGPASSWORD, "\n",
    "DB_NAME:", process.env.PGDATABASE, "\n",
    "PORT:", process.env.PGPORT, "\n",
    'DB URL: ', process.env.DATABASE_URL
);


const router = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */


// router.set("views", path.join(__dirname, "views"));
// router.use(express.static(path.join(__dirname, "public")));
router.use(middleware.bodyParser());
router.use(middleware.consoleDisplay());
// router.use(middleware.cors_call());
router.use(middleware.cors_call());
router.use(express.json());//parse requests as json objects


/**
 * Routes Definitions
 */
router.use('/api/v1', routes);
router.use('/api/v1', userRoutes);
router.use('/api/v1', authRoutes);
router.use('/api/v1', transactionRoutes);
router.use('/api/v1', forgotPassRoutes);

//set up server state
initializeState();

//timed method set-up
// setInterval(hourlyRun, 20000);
setInterval(hourlyRun, 3600000);

/**
 * SSL Check
 */
// const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

/**
 * Server Activation
 */
const httpServer = http.createServer(router);
httpServer.listen(port, () => {
    console.log(`HTTP: Listening to requests on http://localhost:${port}`);
});