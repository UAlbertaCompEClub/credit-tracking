import express, { NextFunction, Request, Response } from 'express';
import * as queries from '../../controllers/db/dbUsers';
import * as regQueries from '../../controllers/db/dbQueries';
import { checkPass, verifyToken } from '../../auth/auth';
import { assert } from 'console';

export const router = express.Router();

router.post('/user', async (req: Request, res: Response) => {
    new Promise<void>((resolve) => {
        resolve();
        console.log('user creation process begin!')
    })
    .then(async () => {
        const params = req.body;
        const token = params.token;
        assert(token !== undefined && token !== null);

        console.log('token', token);
        console.log(params);
        
        let key = process.env.SECRETKEY;
        assert(key !== undefined && key !== null);
        key = key || '';

        //checks if user is verified
        verifyToken(token, key);

        let foip = false;
        if (params.foip === true) {
            foip = true;
        }

        const execExistsCheck = await regQueries.getExec({ ccid: params.ccid });
        if (params.isexec === true) {
            if (execExistsCheck.length !== 0) {
                console.log("Exec Already Exists!");
                throw new Error();
            }

            const execParams = {
                ccid: params.ccid,
                password: params.password,
                clubid: parseInt(params.clubid)
            };
            await queries.createExec(execParams);
        }

        console.log("check if user exists");
        const userExistsCheck = await regQueries.getUser({ ccid: params.ccid });
        if (userExistsCheck.length!==0) {
            if (execExistsCheck.length!==0) {
                console.error("User Already Exists!");
                throw new Error();
            }
        }

        //Create User Row
        const userParams = {
            ccid: params.ccid,
            isexec: params.isexec,
            full_name: params.full_name,
            foip: foip,
            balance: 0
        };
        await queries.createUser(userParams);
        
    })
    .then(data =>
        res.status(200).json({
            status: 0
        })
    )
    .catch(data =>
        res.status(400).json({
            status: -1
        })
    );
});

router.post('/update-password', async (req: Request, res: Response) => {
    new Promise<void>((resolve) => {
        resolve();
        console.log('exec password update process begin!')
    })
    .then(async () => {
        const params = req.body;
        const token = params.token;
        assert(token !== undefined && token !== null);

        console.log('token', token);
        console.log(params);

        let key = process.env.SECRETKEY;
        assert(key !== undefined && key !== null);
        key = key || '';

        //checks if user is verified
        verifyToken(token, key);

        const execExists = await regQueries.getExec({ ccid: params.ccid });
        const hashPass = execExists[0].password;

        const passVerified = await checkPass(params.oldPassword, hashPass);
        console.log("pass", passVerified);
        if (passVerified===false) {
            console.error("Password could not be verified!");
            throw new Error();
        }

        const execParams = {
            ccid: params.ccid,
            oldPassword: params.oldPassword,
            newPassword: params.newPassword
        };
        await queries.updatePass(execParams);
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

export default router;