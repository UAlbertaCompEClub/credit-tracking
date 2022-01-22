import * as userQueries from '../controllers/db/dbUsers';

const computeActiveUsers = async () => {
    var day = new Date().getDay();
    if (day===1) {
        userQueries.updateActiveUsers();
    }
}

export default computeActiveUsers;