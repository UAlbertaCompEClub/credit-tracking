import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './dbConnection';
import { encryptPass } from '../../auth/auth';
import crypto from 'crypto';

const deleteValidCode = (param: { code: string }) => {
    const entry: schema.forgot_password.Whereable = {
        code: param.code
    };
    return db.deletes('forgot_password', entry).run(connection);
};

const checkValidCode = (param: { code: string }) => {
    const entry: schema.forgot_password.Whereable = {
        code: param.code
    };
    return db.select('forgot_password', entry).run(connection);
};

const deletestaleResetCodes = () => {
    db.sql`   
        DELETE FROM forgot_password F
        WHERE F.created_at > now() - interval '1 day'
    `.run(connection);
};

const checkUserForgot = (param: { ccid: string }) => {
    const entry: schema.forgot_password.Whereable = {
        ccid: param.ccid
    };
    return db.select('forgot_password', entry).run(connection);
};

const createForgetPassCode = (userParam: { ccid: string }) => {
    var code = crypto.randomBytes(10).toString('hex');
    const entry: schema.forgot_password.Insertable = {
        ccid: userParam.ccid,
        code: code
    };
    db.insert('forgot_password', entry).run(connection);
    return code;
};

const getForgetPassCode = (userParam: { ccid: string }) => {
    const entry: schema.forgot_password.Whereable = {
        ccid: userParam.ccid
    };
    return db.select('forgot_password', entry).run(connection);
};

const createUser = (userParam: { ccid: string; full_name: string, foip: boolean, isexec: boolean; }) => {
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

const updatePass = async (execParam: { ccid: string, newPassword: string; }) => {
    const exec: schema.execs.Whereable = {
        ccid: execParam.ccid
    };
    
    const encryptedPass = await encryptPass(execParam.newPassword);
    const newPass: schema.execs.Updatable = {
        password: (encryptedPass || ''),
    };

    db.update('execs', newPass, exec).run(connection);
};

const getActiveUsers = () => {
    const query = db.sql<schema.users.SQL | schema.users.Selectable[]>`
    SELECT U.ccid
    FROM ${"users"} U
    WHERE U.active = True
    `.run(connection);
    return query;
};

const updateActiveUsers = () => {
    const query = db.sql<schema.users.SQL | schema.transactions.SQL>`
        UPDATE users
        SET active = True
        WHERE ccid IN (SELECT U.ccid
            FROM transactions T, users U
            WHERE T.ccid = U.ccid
            AND T.created_at > now() - interval '1 year'
            GROUP BY U.ccid

            UNION

            SELECT U.ccid
            FROM users U
            WHERE U.balance != 0);

        UPDATE users
        SET active = False
        WHERE ccid NOT IN (SELECT U.ccid
            FROM transactions T, users U
            WHERE T.ccid = U.ccid
            AND T.created_at > now() - interval '1 year'
            GROUP BY U.ccid

            UNION

            SELECT U.ccid
            FROM users U
            WHERE U.balance != 0)
    `.run(connection);
    return query;
};

export {
    createExec,
    createUser,
    updatePass,
    getActiveUsers,
    updateActiveUsers,
    createForgetPassCode,
    getForgetPassCode,
    deletestaleResetCodes,
    checkValidCode,
    deleteValidCode,
    checkUserForgot
};