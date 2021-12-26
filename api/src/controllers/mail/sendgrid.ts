import sgMail from '@sendgrid/mail';
import assert from 'assert';
import * as queries from '../db/dbQueries';
import * as render from './renderInvoice';
import type * as schema from 'zapatos/schema';
require('dotenv').config({ path: './src/controllers/mail/sendgrid.env' });

const shipInvoice = async (ccid: string, clubs: schema.clubs.JSONSelectable[]) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    assert(apiKey !== null && apiKey !== undefined);

    const sender = process.env.SENDGRID_SENDER;
    assert(sender !== null && sender !== undefined);

    const templateID = process.env.SENDGRID_TEMPLATE_ID;
    assert(templateID !== null && templateID !== undefined);

    const clubBalances = await render.renderBalances(clubs, ccid);
    const transactionsRendered = await render.renderTransactions(clubs, ccid);
    console.log(transactionsRendered);

    sgMail.setApiKey(apiKey);
    const msg = {
        to: ccid.concat('@ualberta.ca'),
        from: sender,
        html: ' ',
        dynamic_template_data: {
            full_name: 'Valued User',
            clubs: clubBalances,
            transactions: transactionsRendered
        },
        template_id: templateID
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent to', ccid);
        })
        .catch((error: any) => {
            console.error(error);
        })
}

export {
shipInvoice
};