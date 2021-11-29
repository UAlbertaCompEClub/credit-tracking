import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbAuth';
import * as auth from '../../auth/auth';

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
    
        const passwordSame = await auth.checkPass(password, hashedPass);
        if (passwordSame === true) {
            res.status(200).json({
                body: exec[0]
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