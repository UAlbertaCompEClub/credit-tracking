import * as stateQueries from '../repositories/state';
import * as userQueries from '../repositories/users';
import * as queueQueries from '../repositories/queue';
import { beginDeployment } from './deployment';

const tick = () => {
    //get the mins of the current time
    var day = new Date().toString().substring(0,3);
    // console.log(day);
    if (day === "Mon") {
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