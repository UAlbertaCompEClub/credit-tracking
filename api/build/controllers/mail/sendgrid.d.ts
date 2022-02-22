import type * as schema from 'zapatos/schema';
declare const shipInvoice: (ccid: string, clubs: schema.clubs.JSONSelectable[]) => Promise<void>;
declare const forgotPasswordEmail: (ccid: string) => Promise<0 | undefined>;
export { shipInvoice, forgotPasswordEmail };
//# sourceMappingURL=sendgrid.d.ts.map