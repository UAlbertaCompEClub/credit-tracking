import assert from 'assert';
import * as queries from '../../repositories/base';

const renderBalances = async (clubs:any, ccid: string) => {
    var balanceDict = Object();
    var clubIdList = Array();
    clubs.forEach((element: any) => {
        clubIdList.push(element.clubid);
        balanceDict[element.clubid]=0;
    });
    const transactions = (await queries.transactionsUser({ ccid: ccid, clubid: 0 }));
    transactions.forEach((element:any) => {
        balanceDict[element.clubid] += element.amount;
    });
    // console.log(clubIdList, balanceDict);
    
    var renderedList = '';
    clubs.forEach((element:any) => {
        if (balanceDict[element.clubid]!==0) {
            renderedList=renderedList.concat('<li>');
            renderedList=renderedList.concat(element.clubname, ': ');
            if (balanceDict[element.clubid]<0) {
                renderedList=renderedList.concat('-');
            }
            renderedList=renderedList.concat('$', 
                Math.abs(parseFloat(balanceDict[element.clubid])).toString(), '</li>');
        }
    });
    // console.log(renderedList);
    return renderedList;
}

const renderTransactions = async (clubs: any, ccid: string) => {
    var transactionsRendered = '';
    for (const club of clubs) {
        const transactions = (await queries.transactionUserWeekly({ ccid: ccid, clubid: club.clubid }));
        if (transactions.length>0) {
            transactionsRendered = transactionsRendered.concat('<strong>', club.clubname, ': </strong>');
            transactions.forEach((transaction: any) => {
                transactionsRendered = transactionsRendered.concat('<p>',
                    transaction.created_at.toISOString().substring(0, 10), ': ');
                transactionsRendered = transactionsRendered.concat()
                if (transaction.amount < 0) {
                    transactionsRendered = transactionsRendered.concat('-');
                }
                transactionsRendered = transactionsRendered.concat('$',
                Math.abs(parseFloat(transaction.amount)).toString(), '</p>');
            });
            transactionsRendered = transactionsRendered.concat('<br>');
        }
    }
    return transactionsRendered;
}

export {
renderBalances,
renderTransactions
};