import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './connection';

const updateState = async (param: {var: string, val: string}) => {
    const where: schema.state.Whereable = {
        var: param.var
    };
    const update: schema.state.Updatable = {
        var: param.var,
        val: param.val
    };
    return await db.update('state', update, where).run(connection);
};

const getInitialized = async () => {
    let query;
    query = await (db.select('state', {}).run(connection));
    if (query.length !== 0) {
        return true;
    }
    else {
        return false;
    }
};

const getState = async (param: { var: string}) => {
    let query;
    if (param.var === 'any') {
        query = await(db.select('state', {}).run(connection));
    }
    else {
        const where: schema.state.Whereable = {
            var: param.var
        };
        query = await (db.select('state', where).run(connection));
    }
    return query[0].val;
};

const createVar = async (param: { var: string, val: string }) => {
    const where: schema.state.Whereable = {
        var: param.var
    };
    const query = await (db.select('state', where).run(connection));
    if (query.length===0) {
        const insert: schema.state.Insertable = {
            var: param.var,
            val: param.val
        };
        await (db.insert('state', insert).run(connection));
    }
};

export {
    getState,
    updateState,
    createVar,
    getInitialized
};