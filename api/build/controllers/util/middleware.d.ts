import { NextFunction, Request, Response } from 'express';
declare type middleware = (req: Request, res: Response, next: NextFunction) => void;
declare function consoleDisplay(): middleware;
declare function bodyParser(): middleware;
declare function cors_call(): middleware;
/**
 *  This is a wrapper that performs exec token checking for routes.
 *  @param Express handler to wrap with exception handling.
 *  @returns A Wrapped Express Handler.
*/
declare const secureExec: (f: any) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 *  This is a wrapper that performs exec token checking for routes.
 *  @param Express handler to wrap with exception handling.
 *  @returns A Wrapped Express Handler.
*/
declare const secureUser: (f: any) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const _default: {
    consoleDisplay: typeof consoleDisplay;
    bodyParser: typeof bodyParser;
    cors_call: typeof cors_call;
};
export default _default;
export { secureExec, secureUser };
//# sourceMappingURL=middleware.d.ts.map