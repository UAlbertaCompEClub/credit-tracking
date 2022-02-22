import type * as schema from 'zapatos/schema';
declare const queueUsers: (users: schema.users.JSONSelectable[]) => void;
declare const getQueue: () => Promise<schema.invoice_queue.JSONSelectable[]>;
declare const removeUser: (ccid: string) => Promise<schema.invoice_queue.JSONSelectable[]>;
export { queueUsers, getQueue, removeUser };
//# sourceMappingURL=queue.d.ts.map