import * as userQueries from '../repositories/users';

const computeActiveUsers = async () => {
    var day = new Date().getDay();
    if (day===1) {
        userQueries.updateActiveUsers();
    }
}

export default computeActiveUsers;