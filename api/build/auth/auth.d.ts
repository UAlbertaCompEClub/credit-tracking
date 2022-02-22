declare const encryptPass: (pass: string) => Promise<string | void>;
declare const checkPass: (inputPass: string, hashPass: string) => Promise<boolean | void>;
declare const verifyToken: (token: string, key: string) => void;
declare const verifyUser: (token: string, key: string) => void;
export { encryptPass, checkPass, verifyToken, verifyUser };
//# sourceMappingURL=auth.d.ts.map