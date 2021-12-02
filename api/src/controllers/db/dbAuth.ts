import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './dbConnection';
import { encryptPass } from '../../auth/auth';

const returnExec = async (userParam: { ccid: string; }) => {
    const where: schema.execs.Whereable = {};
    where.ccid = userParam.ccid;

    return db.select('execs', where).run(connection);
};

export {
    returnExec
};