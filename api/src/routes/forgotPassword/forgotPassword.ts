import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbUsers';
import * as genQueries from '../../controllers/db/dbQueries';
import * as stateQueries from '../../controllers/db/dbState';
import { forgotPasswordEmail } from '../../controllers/mail/sendgrid';

const router = express.Router();

router.post('/forgot-password/', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    const user = (await genQueries.getExec({ ccid: params.ccid }));
    const nEmailSent = parseInt(await stateQueries.getState({ var:'nEmailSent'}));

    if (user.length === 0 && params.ccid !== null) {
        res.status(400).json({
            body: -1
        })
    }
    else if (nEmailSent >= 95) {
        res.status(400).json({
            body: {
                success: -1,
                msg: "Message Limit Reached, try again tomorrow!"
            }
        })
    }
    else {
        const forgot = await forgotPasswordEmail(params.ccid);
        if (forgot === 0) {
            console.log('Email to', params.ccid, 'already sent!');
        }
        await stateQueries.updateState({ var: 'nEmailSent', val: (nEmailSent+1).toString()});
    }
});

router.post('/email-reset/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Reset Attempt')
    const params = req.body;
    const user = await queries.checkValidCode({ code: params.code });
    if (user.length === 0) {
        res.status(400).json({
            body: -1
        })
    }
    else {
        queries.updatePass({
            ccid: params.ccid,
            newPassword: params.password
        });
        queries.deleteValidCode({code: params.code})
        res.status(200).json({
            body: 1
        })
    }
});


export default router;