import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './connection';

const queueUsers = (users: schema.users.JSONSelectable[]) => {
    db.insert('invoice_queue', users).run(connection);
};

const getQueue = () => {
    const where: schema.users.Whereable = {};
    return db.select('invoice_queue', where).run(connection);
};

const removeUser = (ccid: string) => {
    const where: schema.users.Whereable = {
        ccid:ccid
    };
    return db.deletes('invoice_queue', where).run(connection);
};

export {
    queueUsers,
    getQueue,
    removeUser
};