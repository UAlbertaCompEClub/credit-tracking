import { timeStamp } from 'console';
import { Pool, Client } from 'pg';
import * as db from 'zapatos/db';
import type * as schema from 'zapatos/schema';
import connection from './dbConnection';

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

const getState = async (param: { var: string}) => {
    if (param.var === 'any') {
        const where: schema.state.Whereable = {};
        const query = await(db.select('state', where).run(connection));
        return query[0].val;
    }
    else {
        const where: schema.state.Whereable = {
            var: param.var
        };
        const query = await (db.select('state', where).run(connection));
        return query[0].val;
    }
};

const createVar = async (param: { var: string, val: string }) => {
    const where: schema.state.Whereable = {
        var: param.var
    };
    const query = await (db.select('state', where).run(connection));
    if (query.length!==0) {
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
    createVar
};