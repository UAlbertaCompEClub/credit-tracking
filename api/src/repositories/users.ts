import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './connection';
import { encryptPass } from '../auth/auth';
import crypto from 'crypto';
import assert from 'assert';

const deleteExec = async (param: { ccid: string; }) => {
    const exec: schema.execs.Whereable = {
        ccid: param.ccid
    };
    await db.deletes('execs', exec).run(connection);

    const user: schema.users.Whereable = {
        ccid: param.ccid
    };
    db.update('users', { isexec: false }, user).run(connection);
};

const convertExec = async (param: { ccid: string, isexec: boolean, clubid: number; }) => {
    const user: schema.users.Whereable = {
        ccid: param.ccid
    };
    const execStatus: schema.users.Updatable = {
        isexec: param.isexec
    };
    await db.update('users', execStatus, user).run(connection);

    const exec: schema.execs.Insertable = {
        ccid: param.ccid,
        clubid: param.clubid
    };
    await db.insert('execs', exec).run(connection);
};

const setSubscribed = (param: { ccid: string, subscribed: boolean; }) => {
    const user: schema.users.Whereable = {
        ccid: param.ccid
    };

    const subStatus: schema.users.Updatable = {
        subscribed: param.subscribed
    };

    db.update('users', subStatus, user).run(connection);
};

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

const createForgetPassCode = async (userParam: { ccid: string }) => {
    var code = crypto.randomBytes(10).toString('hex');
    const entry: schema.forgot_password.Insertable = {
        ccid: userParam.ccid,
        code: code
    };
    await db.insert('forgot_password', entry).run(connection);
    return code;
};

const getForgetPassCode = (userParam: { ccid: string }) => {
    const entry: schema.forgot_password.Whereable = {
        ccid: userParam.ccid
    };
    return db.select('forgot_password', entry).run(connection);
};

const createUser = async (userParam: { ccid: string; full_name: string, foip: boolean, isexec: boolean, password: string; }) => {
    const encryptedPass = await encryptPass(userParam.password);
    assert(encryptedPass !== undefined && encryptedPass !== null);
    const user: schema.users.Insertable = {
        ccid: userParam.ccid,
        full_name: userParam.full_name,
        foip: userParam.foip,
        isexec: userParam.isexec,
        balance: 0,
        password: encryptedPass
    };
    db.insert('users', user).run(connection);
};

const createExec = async (execParam: { ccid: string, password: string, clubid: number, name: string; }) => {
    /* Check if non-exec user with this ccid already exists */
    const userParam: schema.users.Whereable = {
        ccid: execParam.ccid
    };
    const user = await db.select('users', userParam).run(connection);
    
    if (user.length === 0) {
        console.log('creating new exec from scratch!');
        const encryptedPass = await encryptPass(execParam.password);
        assert(encryptedPass !== undefined && encryptedPass !== null);
        const userNew: schema.users.Insertable = {
            ccid: execParam.ccid,
            full_name: execParam.name,
            foip: true,
            isexec: true,
            balance: 0,
            password: encryptedPass
        };
        db.insert('users', userNew).run(connection);
    }
    if (user.length !== 0 && user[0].isexec===false) {
        console.log('converting user to exec!')
        const userWhere: schema.users.Whereable = {
            ccid: execParam.ccid
        };
        const userUpdate: schema.users.Updatable = {
            isexec: true
        };
        db.update('users', userUpdate, userWhere).run(connection);

        const exec: schema.execs.Insertable = {
            ccid: execParam.ccid,
            clubid: execParam.clubid
        };
        db.insert('execs', exec).run(connection);
    }
    
    const exec: schema.execs.Insertable = {
        ccid: execParam.ccid,
        clubid: execParam.clubid
    };
    db.insert('execs', exec).run(connection);
};

const updatePass = async (userParam: { ccid: string, newPassword: string; }) => {
    const user: schema.users.Whereable = {
        ccid: userParam.ccid
    };
    
    const encryptedPass = await encryptPass(userParam.newPassword);
    assert(encryptedPass !== undefined && encryptedPass !== null);

    const newPass: schema.users.Updatable = {
        password: encryptedPass
    };

    db.update('users', newPass, user).run(connection);
};

const getActiveUsers = () => {
    const query = db.sql<schema.users.SQL | schema.users.Selectable[]>`
    SELECT U.ccid
    FROM ${"users"} U
    WHERE U.active = True
    AND U.subscribed = True
    AND U.balance != 0
    `.run(connection);
    return query;
};

const updateActiveUsers = async () => {
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
    return await query;
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
    checkUserForgot,
    setSubscribed,
    convertExec,
    deleteExec
};