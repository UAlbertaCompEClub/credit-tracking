import * as stateQueries from '../repositories/state';
import * as userQueries from '../repositories/users';
import * as queueQueries from '../repositories/queue';
import { beginDeployment } from './deployment';

const invoiceSendNeeded = () => {
    const dbDate = stateQueries.getState({ var: 'invoiceResetTime' });
    const date = new Date(String(dbDate));
    const dateNow = new Date();
    const diffMill = Math.abs(date.getTime() - dateNow.getTime());
    const diffDays = Math.ceil(diffMill / (1000 * 60 * 60 * 24));

    let sendNeeded = false;
    if (diffDays >= 7) {
        sendNeeded = true;
        console.log('email counter reset needed');
        stateQueries.updateState({ var: 'invoiceResetTime', val: dateNow.toString() });
    }
    else {
        console.log('email counter reset not needed');
    }
    return sendNeeded;
}

const tick = () => {
    const sendNeeded = invoiceSendNeeded();
    if (sendNeeded) {
        // console.log("activeUsers");
        queueRoutine();
    }
}

const queueRoutine = async () => {
    await queueAll();
    beginDeployment();
}

const queueAll = async () => {
    const activeUsers = await userQueries.getActiveUsers();
    queueQueries.queueUsers(activeUsers);
    console.log("Users Queued!");
}

const computeActiveUsers = async () => {
    var day = new Date().getDay();
    if (day===1) {
        userQueries.updateActiveUsers();
    }
}

export {
    tick,
    computeActiveUsers,
    queueRoutine
};