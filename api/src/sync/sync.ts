import * as stateQueries from '../controllers/db/dbState';
import * as userQueries from '../controllers/db/dbUsers';

const hourlyRun = () => {
    //get the mins of the current time
    var hour = new Date().getHours();
    console.log(hour);
    userQueries.deletestaleResetCodes();
    if (hour === 0) {
        stateQueries.updateState({var: 'nEmailSent', val: '0'});
    }
}

export {
    hourlyRun
}