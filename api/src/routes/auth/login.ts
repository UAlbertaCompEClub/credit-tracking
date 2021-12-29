import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbAuth';
import * as regQueries from '../../controllers/db/dbQueries';
import * as auth from '../../auth/auth';
import jwt from 'jsonwebtoken';
import assert from 'assert';

require('dotenv').config({ path: './src/auth/secret-key.env' });


const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const params = req.body;
    const execParams = {
        ccid: params.ccid
    };
    const exec = await regQueries.getExec(execParams);
    if (exec.length===1) {
        const password = params.password;
        const hashedPass = exec[0].password;

        const key = process.env.SECRETKEY;
        // console.log(key);

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