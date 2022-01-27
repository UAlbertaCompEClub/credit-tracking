import assert from 'assert';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../auth/auth';
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
    return cors();
};


/**
 *  This is a wrapper that performs token checking for routes.
 *  @param Express handler to wrap with exception handling.
 *  @returns A Wrapped Express Handler.
*/
const secure = (f: any) => {
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
            controller(f.call(this, req, res, next));
        } catch (e) {
            next(e);
        }
    }
}


export default {
    consoleDisplay,
    bodyParser,
    cors_call,
    secure
};

export {
    secure
};