import * as stateQueries from '../controllers/db/dbState';

const resetSendLimit = () => {
    //get the mins of the current time
    var hour = new Date().getHours();
    console.log(hour);
    if (hour === 0) {
        stateQueries.updateState({var: 'nEmailSent', val: '0'});
    }
}

const initializeState = async () => {
    const checkInitialized = (await stateQueries.getState({var: 'any'})).length===0;
    if (checkInitialized) {
        stateQueries.createVar({
            var: 'nEmailSent',
            val: '0'
        })
    }
    else {
        console.log("Server state has been already been initialized!");
    }
}

export {
    initializeState,
    resetSendLimit
};