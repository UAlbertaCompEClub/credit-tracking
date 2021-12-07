import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbUsers';
import type * as schema from 'zapatos/schema';
import middleWare from '../../controllers/controllers';

export const router = express.Router();

router.post('/user', async (req: Request, res: Response) => {
    // const params = res.json(req.body);
    const userPromise = new Promise((resolve, reject) => {
    });
    const params = req.body;

    userPromise
    .then(async (params:any) => {
        let foip = false;
        if (params.foip === "t") {
            foip = true;
        }

        if (params.isexec === "t") {
            const userParams = {
                ccid: params.ccid,
                isexec: true,
                full_name: params.full_name,
                foip: foip,
                balance: 0
            };
            const userQuery = await queries.createUser(userParams);

            const execParams = {
                ccid: params.ccid,
                password: params.password,
                clubid: parseInt(params.clubid)
            };
            const execQuery = await queries.createExec(execParams);
        }
        else {
            const userParams = {
                ccid: params.ccid,
                isexec: true,
                full_name: params.full_name,
                foip: foip,
                balance: 0
            };
            const query = await queries.createUser(userParams);
        }
    })
    .then(data => {
        res.status(200).json({
            body: 1
        });
    })
    .catch(data=> {
        res.status(400).json({
            body: -1
        });
    })


});


export default router;