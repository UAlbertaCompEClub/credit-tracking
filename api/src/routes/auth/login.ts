import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbAuth';
import * as regQueries from '../../controllers/db/dbQueries';
import * as auth from '../../auth/auth';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import { Console } from 'console';

require('dotenv').config({ path: './src/auth/secret-key.env' });


const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    console.log(req.body);
    const params = req.body;
    const userParams = {
        ccid: params.ccid
    };

    const key = process.env.SECRETKEY;
    const user = (await regQueries.getUser(userParams));

    //we need to ensure that the key has been supplied here!
    assert(key !== undefined && key !== null);

    if (user.length === 1) {
        const password = params.password;
        const hashedPass = user[0].password;

        
        const passwordSame = await auth.checkPass(password, hashedPass);
        const exec = (await regQueries.getExec(userParams))[0];
        if (passwordSame === true && user[0].isexec===true) {
            const club = (await regQueries.getClub({ clubid: exec.clubid}))[0];
            res.status(200).json({
                clubid: exec.clubid,
                ccid: exec.ccid,
                club: club.clubname,
                isExec: user[0].isexec,
                token: jwt.sign(userParams, key, { expiresIn: '30d' })
            });
        }
        else if (passwordSame === true && user[0].isexec !== true) {
            res.status(200).json({
                ccid: params.ccid,
                isExec: user[0].isexec,
                token: jwt.sign(userParams, key, { expiresIn: '30d' })
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