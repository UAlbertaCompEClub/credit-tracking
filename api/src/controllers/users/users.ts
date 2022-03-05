import { Request, Response } from 'express';
import controller from '../util/controllerUtil';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import * as baseRepo from '../../repositories/base';
import * as userRepo from '../../repositories/users';
import * as auth from '../../auth/auth';
import type * as schema from 'zapatos/schema';
import { secureUser, secureExec } from '../util/middleware';


/**
 *  Logs a user into the system
 *  @param req HTTP request.
 *  @param res HTTP response.
 *  @returns Array of all inventory items.
*/
const getUser = controller(async (req: Request, res: Response) => {
    const params = req.body;
    const User: schema.users.JSONSelectable[] = [];
    if (params.hasOwnProperty('ccid')) {
        console.log("inserted ccid");
        console.log(params.ccid);
        const queryParams = {
            ccid: params.ccid
        };
        const user = (await baseRepo.getUser(queryParams))[0];
        user.subscribed
        const userCleaned = {
            ccid: user.ccid,
            isexec: user.isexec,
            active: user.active,
            full_name: user.full_name,
            subscribed: user.subscribed,
            balance: user.balance
        }
        res.status(200).json({
            body: userCleaned
        });
    }
    else if (params.hasOwnProperty('clubid')) {
        console.log("inserted clubid");
        const queryParams = {
            clubid: parseInt(params.clubid)
        };
        const usersGet = await baseRepo.getUsers(queryParams);
        var users = Array();
        usersGet.forEach((element: schema.users.Selectable) => {
            users.push({
                ccid: element.ccid,
                full_name: element.full_name,
                isexec: element.isexec,
                balance: element.balance
            });
        });
        res.status(200).json({
            body: users
        });
    }
    else {
        const queryParams = {
            ccid: 'any',
        };
        const User = await baseRepo.getUser(queryParams);
        res.status(200).json({
            body: User
        });
    }
});

const checkCcid = controller(async (req: Request, res: Response) => {
    const params = { ccid: String(req.get('ccid')) };
    const User = await baseRepo.getUser(params);
    console.log(User)
    if (User.length == 0) {
        //No user found
        res.status(200).json({
            body: -1
        });
    } else {
        res.status(200).json({
            body: (User[0].isexec ? 1 : 0) //Return 1 if user is an exec, 0 if they are not
        });
    }
});


const createUser = secureExec(async (req: Request, res: Response) => {
    new Promise<void>((resolve) => {
        resolve();
        console.log('user creation process begin!')
    })
    .then(async () => {
        const params = req.body;
        let foip = false;
        if (params.foip === true) {
            foip = true;
        }

        console.log("check if user exists");
        const execExistsCheck = await baseRepo.getExec({ ccid: params.ccid });
        const userExistsCheck = await baseRepo.getUser({ ccid: params.ccid });
        console.log('exec exists: ', execExistsCheck.length, 'user exists: ', userExistsCheck.length)

        if (params.isexec === true) {
            if (execExistsCheck.length === 0) {
                console.error("Attempt to add exec");
                const execParams = {
                    ccid: params.ccid,
                    name: params.full_name,
                    clubid: params.clubid,
                    password: params.password
                };
                await userRepo.createExec(execParams);
                res.status(200).json({ status: 0 });
                return;
            }
            else {
                console.error("Exec exists!");
                res.status(400).json({ status: -3 });
                return;
            }
        }
        else {
            if (userExistsCheck.length === 0) {
                console.error("Creating user!");
                const userParams = {
                    ccid: params.ccid,
                    isexec: params.isexec,
                    full_name: params.full_name,
                    foip: foip,
                    balance: 0,
                    password: params.password
                };
                await userRepo.createUser(userParams);
                res.status(200).json({ status: 1 });
                return;
            }
            else if (execExistsCheck.length !== 0) {
                console.error("Deleting exec!");
                const execParams = {
                    ccid: params.ccid
                };
                userRepo.deleteExec(execParams);
                res.status(200).json({ status: 2 });
                return;
            }
            else {
                console.log("User Already Exists!");
                res.status(400).json({ status: -2 });
            }
        }
        if ((params.isexec === true && execExistsCheck.length !== 0) || userExistsCheck.length !== 0) {
            res.status(400).json({ status: -4 });
            return;
        }
        res.status(200).json({ status: 0 });
        console.error("Nothing done!");
        return;
    });
});

const setSubscribed = secureUser(async (req: Request, res: Response) => {
    new Promise<void>((resolve) => {
        resolve();
        console.log('user subscription setting change begin!')
    })
        .then(async () => {
            const params = req.body;
            const userParams = {
                ccid: params.ccid,
                subscribed: params.subscribed
            };
            userRepo.setSubscribed(userParams);
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
    getUser,
    createUser,
    checkCcid,
    setSubscribed
}