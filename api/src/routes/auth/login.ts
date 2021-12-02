import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbAuth';
import * as auth from '../../auth/auth';
import jwt from 'jsonwebtoken';
import assert from 'assert';

require('dotenv').config({ path: 'secret-key.env' });


export const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const params = res.json(req.body);
    const execParams = {
        ccid: params.get("ccid"),
    };
    const exec = await queries.returnExec(execParams);
    if (exec.length===0) {
        const password = params.get("password");
        const hashedPass = exec[0].password;

        const key = process.env.jwtsecretkey;

        //we need to ensure that the key has been supplied here!
        assert(key !== undefined && key !== null);
    
        const passwordSame = await auth.checkPass(password, hashedPass);
        if (passwordSame === true) {
            res.status(200).json({
                body: exec[0],
                token: jwt.sign(execParams, key, { expiresIn: '30d' })
            });
        }   
        else {
            res.status(200).json({
                body: -1
            });
        }
    }
    else {
        res.status(200).json({
            body: -1
        });
    }
});


export default router;