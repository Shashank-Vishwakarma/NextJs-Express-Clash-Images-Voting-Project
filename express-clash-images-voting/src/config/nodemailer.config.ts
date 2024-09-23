import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import { ENV_VARS } from "../utils/envVariables.js";
import {
    Email,
    PASSWORD_RESET,
    VERIFY_EMAIL,
    WELCOME_EMAIL,
} from "../types/emailType.js";

const transporter = nodemailer.createTransport({
    host: ENV_VARS.SMTP_HOST,
    port: ENV_VARS.SMTP_PORT,
    secure: false,
    auth: {
        user: ENV_VARS.SMTP_USER,
        pass: ENV_VARS.SMTP_PASSWORD,
    },
});

export async function sendEmail(email: Email, type: number) {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));

        let htmlBody = "";
        switch (type) {
            case VERIFY_EMAIL:
                htmlBody = await ejs.renderFile(
                    path.resolve(
                        __dirname,
                        "../views/emails/emailVerification.ejs"
                    ),
                    { token: email.token, email: email.to }
                );
                break;

            case WELCOME_EMAIL:
                htmlBody = await ejs.renderFile(
                    path.resolve(__dirname, "../views/emails/welcomeEmail.ejs"),
                    { name: email.to }
                );
                break;
            case PASSWORD_RESET:
                htmlBody = await ejs.renderFile(
                    path.resolve(
                        __dirname,
                        "../views/emails/resetPasswordEmail.ejs"
                    ),
                    { resetToken: email.token }
                );
                break;

            default:
                break;
        }

        const info = await transporter.sendMail({
            ...email,
            html: htmlBody,
        });

        return { messageId: info.messageId };
    } catch (error) {
        console.log("Error sending the email: ", error);
        return { error: error.message };
    }
}
