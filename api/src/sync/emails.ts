import * as stateQueries from '../repositories/state';
import * as userQueries from '../repositories/users';

const emailResetNeeded = async () => {
    const dbDate = await stateQueries.getState({ var: 'emailResetTime'});
    const date = new Date(dbDate);
    const dateNow = new Date();
    const diffMill = Math.abs(date.getTime() - dateNow.getTime());
    const diffDays = Math.floor(diffMill / (1000 * 60 * 60 * 24));

    console.log('Days since last email reset: ', diffDays);
    let resetNeeded = false;
    if (diffDays>=1) {
        resetNeeded = true;
        console.log('email counter reset needed');
        stateQueries.updateState({ var: 'emailResetTime', val: dateNow.toUTCString() });
    }
    else {
        console.log('email counter reset not needed');
    }
    return resetNeeded;
}

const emailResetRoutine = async () => {
    const resetNeeded = await emailResetNeeded();
    if (resetNeeded) {
        stateQueries.updateState({ var: 'nEmailSent', val: '0' });
    }
}

export {
    emailResetRoutine
}