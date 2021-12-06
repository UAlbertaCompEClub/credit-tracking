import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbUsers';
import type * as schema from 'zapatos/schema';
import middleWare from '../../controllers/controllers';

export const router = express.Router();

router.post('/user', async (req: Request, res: Response) => {

    let foip = false;
    if (req.get('foip') === "t") {
        foip = true;
    }

    if (req.get('isexec')==="t") {
        const userParams = {
            ccid: String(req.get("ccid")),
            isexec: true,
            full_name: String(req.get("full_name")),
            foip: foip,
            balance: 0
        };
        await queries.createUser(userParams);

        const execParams = {
            ccid: String(req.get("ccid")),
            password: String(req.get("password")),
            clubid: parseInt(String(req.get("clubid")))
        };
        await queries.createExec(execParams);
    }
    else {
        const userParams = {
            ccid: String(req.get("ccid")),
            isexec: true,
            full_name: String(req.get("full_name")),
            foip: foip,
            balance: 0
        };
        await queries.createUser(userParams);
    }




    

    res.status(200).json({
        body: "1"
    });
});


export default router;