import { Request, Response } from 'express';
import controller from '../util/controllerUtil';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import * as baseRepo from '../../repositories/base';
import * as auth from '../../auth/auth';



/**
 *  Logs a user into the system
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns Array of all inventory items.
*/
const login = controller(async (req: Request, res: Response) => {
    const params = req.body;
    const userParams = {
        ccid: params.ccid
    };

    const key = process.env.SECRETKEY;
    const user = (await baseRepo.getUser(userParams));

    //we need to ensure that the key has been supplied here!
    assert(key !== undefined && key !== null);

    if (user.length === 1) {
        const password = params.password;
        const hashedPass = user[0].password;


        const passwordSame = await auth.checkPass(password, hashedPass);
        const exec = (await baseRepo.getExec(userParams))[0];
        if (passwordSame === true && user[0].isexec === true) {
            const club = (await baseRepo.getClub({ clubid: exec.clubid }))[0];
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
            res.status(400).json({
                ccid: -1
            });
        }
    }
    else {
        res.status(400).json({
            ccid: -1
        });
    }
});


export {
    login
}
