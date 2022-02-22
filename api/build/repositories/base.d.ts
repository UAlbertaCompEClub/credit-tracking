import type * as schema from 'zapatos/schema';
declare const createTransaction: (transactionParam: {
    ccid: string;
    clubid: number;
    amount: number;
    exec: string;
}) => Promise<schema.transactions.JSONSelectable>;
declare const transactionsUser: (transaction: {
    clubid: number;
    ccid: string;
}) => Promise<schema.transactions.JSONSelectable[]>;
declare const transactionUserWeekly: (transactionParam: {
    clubid: number;
    ccid: string;
}) => Promise<any[]>;
declare const transactionsAll: () => Promise<schema.transactions.JSONSelectable[]>;
declare const getClub: (queryParams: {
    clubid: number;
}) => Promise<schema.clubs.JSONSelectable[]>;
declare const getClubs: () => Promise<schema.clubs.JSONSelectable[]>;
declare const clubBalance: (queryParams: {
    clubid: number;
}) => Promise<schema.clubs.JSONSelectable[]>;
declare const getUser: (userParam: {
    ccid: string;
}) => Promise<schema.users.JSONSelectable[]>;
declare const getExec: (userParam: {
    ccid: string;
}) => Promise<schema.execs.JSONSelectable[]>;
declare const getUsers: (userParam: {
    clubid: number;
}) => Promise<schema.users.Selectable[]>;
declare const getUsersRobust: (userParam: {
    clubid: string;
}) => Promise<schema.users.Selectable[]>;
declare const getAllUsers: () => Promise<schema.users.Selectable[]>;
export { createTransaction, clubBalance, transactionsUser, getUser, getUsers, getUsersRobust, transactionsAll, getClub, getClubs, getExec, transactionUserWeekly, getAllUsers };
//# sourceMappingURL=base.d.ts.map