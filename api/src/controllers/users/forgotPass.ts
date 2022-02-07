import { Request, Response } from 'express';
import assert from 'assert';

import controller from '../util/controllerUtil';
import * as userRepo from '../../repositories/users';
import * as baseRepo from '../../repositories/base';
import * as stateRepo from '../../repositories/state';

import { forgotPasswordEmail } from '../../controllers/mail/sendgrid';
import { verifyToken, checkPass } from '../../auth/auth';


/**
 *  Logs a user into the system
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns Array of all inventory items.
*/
const resetEmail = controller(async (req: Request, res: Response) => {
    const params = req.body;
    console.log(params);
    const user = (await baseRepo.getUser({ ccid: params.ccid }));
    const nEmailSent = parseInt(await stateRepo.getState({ var: 'nEmailSent' }));

    if (user.length === 0 && params.ccid !== null) {
        res.status(400).json({
            body: -1
        })
    }
    else if (nEmailSent >= 95) {
        res.status(400).json({
            body: -1
        })
    }
    else {
        const forgot = await forgotPasswordEmail(params.ccid);
        if (forgot === 0) {
            console.log('Email to', params.ccid, 'already sent!');
            res.status(200).json({
                body: 0
            })
        }
        else {
            res.status(200).json({
                body: 1
            })
        }
        await stateRepo.updateState({ var: 'nEmailSent', val: (nEmailSent + 1).toString() });
    }
});

const resetCodeEntry = controller(async (req: Request, res: Response) => {
    console.log('Reset Attempt')
    const params = req.body;
    const user = await userRepo.checkValidCode({ code: params.code });
    if (user.length === 0) {
        console.log("Password Reset Failed!")
        res.status(400).json({
            body: -1
        })
    }
    else {
        console.log("Password Reset Successful!")
        userRepo.updatePass({
            ccid: user[0].ccid,
            newPassword: params.password
        });
        userRepo.deleteValidCode({ code: params.code })
        res.status(200).json({
            body: 1
        })
    }
});

const updatePass = controller(async (req: Request, res: Response) => {
    new Promise<void>((resolve) => {
        resolve();
        console.log('exec password update process begin!')
    })
        .then(async () => {
            const params = req.body;
            const token = params.token;
            assert(token !== undefined && token !== null);

            console.log('token', token);

            let key = process.env.SECRETKEY;
            assert(key !== undefined && key !== null);
            key = key || '';

            //checks if user is verified
            verifyToken(token, key);

            const userExists = await baseRepo.getUser({ ccid: params.ccid });
            const hashPass = userExists[0].password;

            const passVerified = await checkPass(params.oldPassword, hashPass);
            if (passVerified === false) {
                console.error("Password could not be verified!");
                throw new Error();
            }

            const userParams = {
                ccid: params.ccid,
                newPassword: params.newPassword
            };
            await userRepo.updatePass(userParams);
        })
        .then(data =>
            res.status(200).json({
                body: 1
            })
        )
        .catch(data =>
            res.status(400).json({
                body: -1
            })
        );
});

export {
    resetEmail,
    resetCodeEntry,
    updatePass
}