import sgMail from '@sendgrid/mail';
import assert from 'assert';
import * as queries from '../db/dbQueries';
import * as render from './renderInvoice';
require('dotenv').config({ path: './src/controllers/mail/sendgrid.env' });

function tick() {
    //get the mins of the current time
    var sec = new Date().getSeconds();
    if (sec === 0) {
        console.log('Tick');
    }
}

const shipInvoice = async (ccid: string) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    assert(apiKey !== null && apiKey !== undefined);

    const sender = process.env.SENDGRID_SENDER;
    assert(sender !== null && sender !== undefined);

    const templateID = process.env.SENDGRID_TEMPLATE_ID;
    assert(templateID !== null && templateID !== undefined);

    const clubs = (await queries.getClubs());
    const clubBalances = await render.renderBalances(clubs, ccid);
    // console.log(clubBalances);

    const transactionsRendered = await render.renderTransactions(clubs, ccid);
    console.log(transactionsRendered);

    sgMail.setApiKey(apiKey);
    const msg = {
        to: 'mfiaz@ualberta.ca', // Change to your recipient
        from: sender, // Change to your verified sender
        html: ' ',
        dynamic_template_data: {
            full_name: 'Fiaz',
            clubs: clubBalances,
            transactions: transactionsRendered
        },
        template_id: templateID
    }
    // sgMail
    //     .send(msg)
    //     .then(() => {
    //         console.log('Email sent')
    //     })
    //     .catch((error: any) => {
    //         console.error(error)
    //     })
}

export {
tick,
shipInvoice
};