import axios from "axios";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomUser = {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

export type CustomeSession = {
    user?: CustomUser;
    expires: ISODateString;
};

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const response = await axios.post(
                    `${process.env.EXPRESS_SERVER_URL}${process.env.EXPRESS_SERVER_LOGIN_ENDPOINT}`,
                    credentials
                );

                if (response.data?.error) {
                    return null;
                }
                return response.data?.user;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }: { token: JWT; user: CustomUser }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: ({
            session,
            token,
        }: {
            session: CustomeSession;
            token: JWT;
        }) => {
            session.user = token.user as CustomUser;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};
