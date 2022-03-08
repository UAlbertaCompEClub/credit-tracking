import * as stateQueries from '../repositories/state';
import * as userQueries from '../repositories/users';

const emailResetNeeded = () => {
    const dbDate = stateQueries.getState({ var: 'emailResetTime'});
    const date = new Date(String(dbDate));
    const dateNow = new Date();
    const diffMill = Math.abs(date.getTime() - dateNow.getTime());
    const diffDays = Math.ceil(diffMill / (1000 * 60 * 60 * 24));

    let resetNeeded = false;
    if (diffDays>=7) {
        resetNeeded = true;
        console.log('email counter reset needed');
        stateQueries.updateState({ var: 'emailResetTime', val: dateNow.toString() });
    }
    else {
        console.log('email counter reset not needed');
    }
    return resetNeeded;
}

const hourlyRun = () => {
    //get the mins of the current time
    var hour = new Date().getHours();
    console.log(hour);
    userQueries.deletestaleResetCodes();
    const resetNeeded = emailResetNeeded();
    if (resetNeeded) {
        stateQueries.updateState({var: 'nEmailSent', val: '0'});
    }
}

export {
    hourlyRun
}