export type User = {
    id: string;
    name: string;

    email: string;
    email_verified_time?: Date;
    email_verify_token?: string;
    isEmailVerified?: boolean;

    password: string;
    password_reset_token?: string;
    token_sent_time?: Date;

    created_at?: Date;
};
