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

    const user = (await regQueries.getUser(userParams));
    if (user.length === 1 && user[0].isexec===true) {
        const password = params.password;
        const hashedPass = user[0].password;

        console.log(password)
        const key = process.env.SECRETKEY;
        // console.log(key);

        //we need to ensure that the key has been supplied here!
        assert(key !== undefined && key !== null);
        
        const passwordSame = await auth.checkPass(password, hashedPass);
        const exec = (await regQueries.getExec(userParams))[0];
        const club = (await regQueries.getClub({ clubid: exec.clubid}))[0];
        if (passwordSame === true) {
            // TO-DO: change to generalized user solution soon, currently only setup for exec use
            res.status(200).json({
                clubid: exec.clubid,
                ccid: exec.ccid,
                club: club.clubname,
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