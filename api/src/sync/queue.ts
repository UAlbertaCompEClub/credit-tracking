import * as stateQueries from '../repositories/state';
import * as userQueries from '../repositories/users';
import * as queueQueries from '../repositories/queue';
import { beginDeployment } from './deployment';

const invoiceSendNeeded = async () => {
    const dbDate = await stateQueries.getState({ var: 'invoiceResetTime' });
    const date = new Date(dbDate);
    const dateNow = new Date();
    const diffMill = Math.abs(date.getTime() - dateNow.getTime());
    const diffDays = Math.floor(diffMill / (1000 * 60 * 60 * 24));

    console.log('Days since last invoices sent: ', diffDays);
    let sendNeeded = false;
    if (diffDays >= 7) {
        sendNeeded = true;
        console.log('invoice send routine needed');
        stateQueries.updateState({ var: 'invoiceResetTime', val: dateNow.toUTCString() });
        userQueries.updateActiveUsers();
    }
    else {
        console.log('invoice send routine not needed');
    }
    return sendNeeded;
}

const invoicesRoutine = async () => {
    const sendNeeded = await invoiceSendNeeded();
    computeActiveUsers();
    if (sendNeeded) {
        // console.log("activeUsers");
        queueRoutine();
    }
}

const queueAll = async () => {
    const deploying = (await stateQueries.getState({ var: "deploying" }))[0];
    console.log('deploying state:', deploying);
    if (deploying === '0') {
        const activeUsers = await userQueries.getActiveUsers();
        queueQueries.queueUsers(activeUsers);
        console.log("Users Queued!");
    }
}

const queueRoutine = async () => {
    await queueAll();
    beginDeployment();
}

const computeActiveUsers = async () => {
    var day = new Date().getDay();
    var hour = new Date().getHours();
    if (day===1 && hour < 3) {
        userQueries.updateActiveUsers();
    }
}

export {
    invoicesRoutine
};
