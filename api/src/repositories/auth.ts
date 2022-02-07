import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './connection';
import { encryptPass } from '../auth/auth';

const returnExec = (userParam: { ccid: string; }) => {
    const where: schema.execs.Whereable = {};
    where.ccid = userParam.ccid;

    return db.select('execs', where).run(connection);
};

export {
    returnExec
};