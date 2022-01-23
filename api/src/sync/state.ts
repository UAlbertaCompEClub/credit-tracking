import * as stateQueries from '../controllers/db/dbState';

const initializeState = async () => {
    const checkInitialized = await stateQueries.getInitialized();
    if (!checkInitialized) {
        stateQueries.createVar({
            var: 'nEmailSent',
            val: '0'
        })
        stateQueries.createVar({
            var: 'deploying',
            val: '0'
        })
    }
    else {
        console.log("Server state has been already been initialized!");
    }
}

export {
    initializeState
};