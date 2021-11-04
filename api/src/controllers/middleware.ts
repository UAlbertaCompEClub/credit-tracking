import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

type middleware = (req: Request, res: Response, next: NextFunction) => void;

function saySomething(): middleware  {
    return (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            body: 'Hello from the server!'
        });
    };
};

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

export default {
    saySomething,
    consoleDisplay,
    bodyParser,
    cors_call
};