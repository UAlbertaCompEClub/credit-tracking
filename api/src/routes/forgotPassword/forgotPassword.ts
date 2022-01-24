import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbUsers';
import * as genQueries from '../../controllers/db/dbQueries';
import * as stateQueries from '../../controllers/db/dbState';
import { forgotPasswordEmail } from '../../controllers/mail/sendgrid';

const router = express.Router();

router.post('/forgot-password', async (req: Request, res: Response) => {
    const params = req.body;
    console.log(params);
    const user = (await genQueries.getUser({ ccid: params.ccid }));
    const nEmailSent = parseInt(await stateQueries.getState({ var:'nEmailSent'}));

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
        await stateQueries.updateState({ var: 'nEmailSent', val: (nEmailSent+1).toString()});
    }
});

router.post('/email-reset', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Reset Attempt')
    const params = req.body;
    const user = await queries.checkValidCode({ code: params.code });
    if (user.length === 0) {
        console.log("Password Reset Failed!")
        res.status(400).json({
            body: -1
        })
    }
    else {
        console.log("Password Reset Successful!")
        queries.updatePass({
            ccid: user[0].ccid,
            newPassword: params.password
        });
        queries.deleteValidCode({code: params.code})
        res.status(200).json({
            body: 1
        })
    }
});


export default router;