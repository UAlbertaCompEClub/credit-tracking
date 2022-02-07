import sgMail from '@sendgrid/mail';
import assert from 'assert';
import * as queries from '../../repositories/users';
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

const forgotPasswordEmail = async (ccid: string) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    assert(apiKey !== null && apiKey !== undefined);

    const sender = process.env.SENDGRID_SENDER;
    assert(sender !== null && sender !== undefined);

    const templateID = process.env.SENDGRID_FORGET_TEMPLATE_ID;
    assert(templateID !== null && templateID !== undefined);

    const checkForgot = (await queries.checkUserForgot({ ccid: ccid }));

    if (checkForgot.length>0) {
        return 0;
    }

    const forgotPassCheck = await queries.getForgetPassCode({ ccid: ccid });
    var code = '';
    if (forgotPassCheck.length===0) {
        code = await queries.createForgetPassCode({ ccid: ccid });
    }
    else {
        code = forgotPassCheck[0].code;
    }

    const url = process.env.WEBSITE_URL+'forgot-password/'+code;
    const url_html = "<a href='"+url+"'>link</a>";

    sgMail.setApiKey(apiKey);
    const msg = {
        to: ccid.concat('@ualberta.ca'),
        from: sender,
        html: ' ',
        dynamic_template_data: {
            reset_code: code,
            reset_link: url_html
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
    shipInvoice,
    forgotPasswordEmail
};