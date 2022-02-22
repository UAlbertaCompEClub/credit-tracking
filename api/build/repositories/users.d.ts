import type * as schema from 'zapatos/schema';
declare const setSubscribed: (param: {
    ccid: string;
    subscribed: boolean;
}) => void;
declare const deleteValidCode: (param: {
    code: string;
}) => Promise<schema.forgot_password.JSONSelectable[]>;
declare const checkValidCode: (param: {
    code: string;
}) => Promise<schema.forgot_password.JSONSelectable[]>;
declare const deletestaleResetCodes: () => void;
declare const checkUserForgot: (param: {
    ccid: string;
}) => Promise<schema.forgot_password.JSONSelectable[]>;
declare const createForgetPassCode: (userParam: {
    ccid: string;
}) => Promise<string>;
declare const getForgetPassCode: (userParam: {
    ccid: string;
}) => Promise<schema.forgot_password.JSONSelectable[]>;
declare const createUser: (userParam: {
    ccid: string;
    full_name: string;
    foip: boolean;
    isexec: boolean;
    password: string;
}) => Promise<void>;
declare const createExec: (execParam: {
    ccid: string;
    password: string;
    clubid: number;
}) => Promise<void>;
declare const updatePass: (userParam: {
    ccid: string;
    newPassword: string;
}) => Promise<void>;
declare const getActiveUsers: () => Promise<any[]>;
declare const updateActiveUsers: () => Promise<any[]>;
export { createExec, createUser, updatePass, getActiveUsers, updateActiveUsers, createForgetPassCode, getForgetPassCode, deletestaleResetCodes, checkValidCode, deleteValidCode, checkUserForgot, setSubscribed };
//# sourceMappingURL=users.d.ts.map