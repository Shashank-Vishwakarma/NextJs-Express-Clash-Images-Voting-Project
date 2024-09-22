export const WELCOME_EMAIL = 0;
export const VERIFY_EMAIL = 1;
export const PASSWORD_RESET = 2;

export type Email = {
    from: string;
    to: string;
    subject: string;
    html?: string;
    type: number;
    token: string;
};
