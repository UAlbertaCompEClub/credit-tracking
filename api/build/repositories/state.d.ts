import type * as schema from 'zapatos/schema';
declare const updateState: (param: {
    var: string;
    val: string;
}) => Promise<schema.state.JSONSelectable[]>;
declare const getInitialized: () => Promise<boolean>;
declare const getState: (param: {
    var: string;
}) => Promise<string>;
declare const createVar: (param: {
    var: string;
    val: string;
}) => Promise<void>;
export { getState, updateState, createVar, getInitialized };
//# sourceMappingURL=state.d.ts.map