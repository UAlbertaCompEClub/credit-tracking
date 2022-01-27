import { Request, Response, NextFunction } from "express";


/**
 *  This is a wrapper to provide exception handling to express routes.
 *  Helps to reduce boilerplate.
 *  @param Express handler to wrap with exception handling.
 *  @returns A Wrapped Express Handler.
*/
const controller = (f: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            f.call(this, req, res, next);
        } catch (e) {
            next(e);
        }
    }
}
export default controller;