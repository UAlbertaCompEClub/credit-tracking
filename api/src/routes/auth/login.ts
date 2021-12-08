import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbAuth';
import * as regQueries from '../../controllers/db/dbQueries';
import * as auth from '../../auth/auth';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import { Console } from 'console';

require('dotenv').config({ path: './src/auth/secret-key.env' });


export const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  
    const execParams = {
        ccid: String(req.get('ccid'))
    };
    console.log(execParams)
    const exec = await regQueries.getExec(execParams);
    if (exec.length===1) {
        const password = String(req.get('password'));
        const hashedPass = exec[0].password;

        console.log(password)
        const key = process.env.SECRETKEY;
        // console.log(key);

        //we need to ensure that the key has been supplied here!
        assert(key !== undefined && key !== null);
    
        const passwordSame = await auth.checkPass(password, hashedPass);
  
        if (passwordSame === true) {
            res.status(200).json({
                ccid: exec[0].ccid,
                token: jwt.sign(execParams, key, { expiresIn: '30d' }),
                club: (await regQueries.getClubs({clubid:exec[0].clubid}))[0].clubname,
                clubid:exec[0].clubid
            });
        }   
        else {
            res.status(200).json({
                ccid: -1
            });
        }
    }
    else {
        res.status(200).json({
            ccid: -1
        });
    }
});


export default router;