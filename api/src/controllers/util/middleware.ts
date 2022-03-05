import assert from 'assert';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { verifyToken, verifyUser } from '../../auth/auth';
import controller from './controllerUtil';

type middleware = (req: Request, res: Response, next: NextFunction) => void;

function consoleDisplay(): middleware {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(`Request_Endpoint: ${req.method} ${req.url}`);
        next();
    };
};

function bodyParser(): middleware {
    const bodyParser = express.json();
    return bodyParser;
};

function cors_call(): middleware {
    let origin:string|string[] = '*';
    process.env.NODE_ENV === "production" ? origin = ['https://wonderful-clarke-09beec.netlify.app/*', 'https://wonderful-clarke-09beec.netlify.app'] : console.log('NODE_ENV not in production.');
    const corsOptions = {
        origin: origin,
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    return cors(corsOptions);
};

// Add headers before the routes are defined
function cors_access(): middleware {
    return (req: Request, res: Response, next: NextFunction) => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        // Pass to next layer of middleware
        next();
    };
};


/**
 *  This is a wrapper that performs exec token checking for routes.
 *  @param Express handler to wrap with exception handling.
 *  @returns A Wrapped Express Handler.
*/
const secureExec = (f: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const params = req.body;
        try {
            const token = params.token;
            assert(token !== undefined && token !== null);

            let key = process.env.SECRETKEY;
            assert(key !== undefined && key !== null);

            //checks if user is verified
            verifyToken(token, key);

            //continues with remainder of route function call
            f.call(this, req, res, next);
        } catch (e) {
            res.status(400).json({
                status: -1
            })
        }
    }
}

/**
 *  This is a wrapper that performs exec token checking for routes.
 *  @param Express handler to wrap with exception handling.
 *  @returns A Wrapped Express Handler.
*/
const secureUser = (f: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const params = req.body;
        try {
            const token = params.token;
            assert(token !== undefined && token !== null);

            let key = process.env.SECRETKEY;
            assert(key !== undefined && key !== null);

            //checks if user is verified
            verifyUser(token, key);

            //continues with remainder of route function call
            f.call(this, req, res, next);
        } catch (e) {
            res.status(400).json({
                status: -1
            })
        }
    }
}


export default {
    consoleDisplay,
    bodyParser,
    cors_call
};

export {
    secureExec,
    secureUser
};