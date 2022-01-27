import * as queries from '../repositories/base';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { assert } from 'console';

const encryptPass = async (pass: string) => {
    return bcrypt
        .hash(pass, 10)
        .then(hash => {
            return hash;
        })
        .catch(err => console.error(err.message));
}

const checkPass = async (inputPass: string, hashPass: string) => {
    return bcrypt
        .compare(inputPass, hashPass)
        .then(result => {
            return result;
        })
        .catch(err => console.error(err.message));
}

const verifyToken = (token: string, key: string) => {
    jwt.verify(token, key, (err: any, data: any) => {
        if (err) {
            console.log("User not Verified!");
            throw new Error("");
        }
    });
    jwt.verify(token, key, async (err: any, data: any) => {
        const tokenCcidCheck = await queries.getExec({ ccid: data.ccid });
        if (tokenCcidCheck.length !== 1) {
            console.log("User in Token does not Exist!");
            throw new Error("");
        }
    });
}

const verifyUser = (token: string, key: string) => {
    jwt.verify(token, key, (err: any, data: any) => {
        if (err) {
            console.log("User not Verified!");
            throw new Error("");
        }
    });
    jwt.verify(token, key, async (err: any, data: any) => {
        const tokenCcidCheck = await queries.getUser({ ccid: data.ccid });
        if (tokenCcidCheck.length !== 1) {
            console.log("User in Token does not Exist!");
            throw new Error("");
        }
    });
}

export {
    encryptPass,
    checkPass,
    verifyToken,
    verifyUser
};