import { Request, Response, NextFunction } from "express";
/**
 *  This is a wrapper to provide exception handling to express routes.
 *  Helps to reduce boilerplate.
 *  @param Express handler to wrap with exception handling.
 *  @returns A Wrapped Express Handler.
*/
declare const controller: (f: any) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default controller;
//# sourceMappingURL=controllerUtil.d.ts.map