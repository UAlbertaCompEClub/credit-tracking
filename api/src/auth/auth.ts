import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from '../controllers/db/dbConnection';
import bcrypt from 'bcrypt';
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

export {
    encryptPass,
    checkPass
};