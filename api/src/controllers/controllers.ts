import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

type middleWare = (req: Request, res: Response, next: NextFunction) => void;

function saySomething(): middleWare  {
    return (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            body: 'Hello from the server!'
        });
    };
};

function consoleDisplay(): middleWare {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(`Request_Endpoint: ${req.method} ${req.url}`);
        next();
    };
};

export default {
    saySomething,
    consoleDisplay
};