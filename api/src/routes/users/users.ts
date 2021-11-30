import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbUsers';
import type * as schema from 'zapatos/schema';
import middleWare from '../../controllers/controllers';

export const router = express.Router();

router.post('/user', async (req: Request, res: Response) => {
    const params = res.json(req.body);
    let foip = false;
    if (params.get('foip') === "t") {
        foip = true;
    }

    if (params.get('isexec')==="t") {
        const userParams = {
            ccid: params.get("ccid"),
            isexec: true,
            full_name: params.get("full_name"),
            foip: foip,
            balance: 0
        };
        await queries.createUser(userParams);

        const execParams = {
            ccid: params.get("ccid"),
            password: params.get("password"),
            clubid: parseInt(params.get("clubid"))
        };
        await queries.createExec(execParams);
    }
    else {
        const userParams = {
            ccid: params.get("ccid"),
            isexec: true,
            full_name: params.get("full_name"),
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