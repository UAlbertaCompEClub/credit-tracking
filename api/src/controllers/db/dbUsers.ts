import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './dbConnection';
import { encryptPass } from '../../auth/auth';

const createUser = async (userParam: { ccid: string; full_name: string, foip: boolean, isexec: boolean; }) => {
    const user: schema.users.Insertable = {
        ccid: userParam.ccid,
        full_name: userParam.full_name,
        foip: userParam.foip,
        isexec: userParam.isexec,
        balance: 0
    };
    db.insert('users', user).run(connection);
};

const createExec = async (execParam: { ccid: string, password: string, clubid: number; }) => {
    const encryptedPass = await encryptPass(execParam.password);
    const exec: schema.execs.Insertable = {
        ccid: execParam.ccid,
        password: (encryptedPass || ''),
        clubid: execParam.clubid
    };
    db.insert('execs', exec).run(connection);
};

const updatePass = async (execParam: { ccid: string, oldPassword: string, newPassword: string; }) => {
    const exec: schema.execs.Whereable = {
        ccid: execParam.ccid
    };
    
    const encryptedPass = await encryptPass(execParam.newPassword);
    const newPass: schema.execs.Updatable = {
        password: (encryptedPass || ''),
    };

    db.update('execs', newPass, exec).run(connection);
};

export {
    createExec,
    createUser,
    updatePass
};