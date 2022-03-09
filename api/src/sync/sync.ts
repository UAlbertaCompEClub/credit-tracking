import * as stateQueries from '../repositories/state';
import * as userQueries from '../repositories/users';
import { invoicesRoutine } from './queue';
import { emailResetRoutine } from './emails';

const hourlyRun = () => {
    console.log('hourly run begin');
    userQueries.deletestaleResetCodes();
    emailResetRoutine();
    invoicesRoutine();
}

export {
    hourlyRun
}