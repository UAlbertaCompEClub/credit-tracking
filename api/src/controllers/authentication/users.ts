import controller from '../controllers';
import { NextFunction, Request, Response } from 'express';

const postUser = (req: Request, res: Response) => {
    return (req: Request, res: Response) => {
        
    };
};

function consoleDisplay(): controller {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(`Request_Endpoint: ${req.method} ${req.url}`);
        next();
    };
};

export default {
    postUser
};