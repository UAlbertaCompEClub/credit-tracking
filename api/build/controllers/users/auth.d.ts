/// <reference types="qs" />
import { Request, Response } from 'express';
/**
 *  Logs a user into the system
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns Array of all inventory items.
*/
declare const login: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void>;
export { login };
//# sourceMappingURL=auth.d.ts.map