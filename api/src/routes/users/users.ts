import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbUsers';
import type * as schema from 'zapatos/schema';
import middleWare from '../../controllers/controllers';

export const router = express.Router();

router.post('/user', async (req: Request, res: Response) => {
    // const params = res.json(req.body);
    const params = req.body;
    let foip = false;
    if (params.foip === "t") {
        foip = true;
    }

    if (params.isexec==="t") {
        const userParams = {
            ccid: params.ccid,
            isexec: true,
            full_name: params.full_name,
            foip: foip,
            balance: 0
        };
        await queries.createUser(userParams);

        const execParams = {
            ccid: params.ccid,
            password: params.password,
            clubid: parseInt(params.clubid)
        };
        await queries.createExec(execParams);
    }
    else {
        const userParams = {
            ccid: params.ccid,
            isexec: true,
            full_name: params.full_name,
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