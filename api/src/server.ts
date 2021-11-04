import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';


import routes from './routes/routes';
import middleware from './controllers/middleware';

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


/**
 * Server Activation
 */

router.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});