import { shipInvoice } from '../controllers/mail/sendgrid';
import * as stateQueries from '../controllers/db/dbState';
import * as userQueries from '../controllers/db/dbUsers';
import * as basicQueries from '../controllers/db/dbQueries';
import * as queueQueries from '../controllers/db/dbQueue';
import type * as schema from 'zapatos/schema';

/* 
    This function will remain deploying forever
    until it is done deploying all invoices.
*/
const beginDeployment = async () => {
    const deploying = (await stateQueries.getState({ var: "deploying"}))[0];
    if (deploying==='1') {
        return;
    }
    while (true) {
        stateQueries.updateState({ var: "deploying", val: "1"});
        const queued = await queueQueries.getQueue();
        if (queued.length===0) {
            stateQueries.updateState({ var: "deploying", val: "0" });
            return;
        }
        var nEmailSent = parseInt((await stateQueries.getState({ var: 'nEmailSent'}))[0]);
        const clubs = (await basicQueries.getClubs());
    
        while(nEmailSent<80 && queued.length!==0) {
            const user = queued.pop();
            /* 
            this version of the code may not send an invoice if
            the user balances at different clubs cancels out

            EXAMPLE:
            if the user has a -$10 balance at one club but
            +$10 balance at another club they will not be
            sent an invoice.
            */
            if (typeof user!== "undefined") {
                try {
                    shipInvoice(user.ccid, clubs);
                    nEmailSent = parseInt((await stateQueries.getState({ var: 'nEmailSent' }))[0]);
                    stateQueries.updateState({ var: "nEmailSent", val: (nEmailSent + 1).toString() });
                    queueQueries.removeUser(user.ccid);
                } catch (error) {
                    console.log("Email could not be sent for", user.ccid);
                }
            }
        }

        if (queued.length === 0) {
            stateQueries.updateState({ var: "deploying", val: "0" });
            return;
        }

        setTimeout(function () { console.log("Will try to continue sending emails tomorrow!"); }, 24*3600000);
    }
}

export {
    beginDeployment
};