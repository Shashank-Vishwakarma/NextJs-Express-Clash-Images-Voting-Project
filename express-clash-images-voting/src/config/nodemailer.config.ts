import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import { ENV_VARS } from "../utils/envVariables.js";
import { Email } from "../types/emailType.js";

const transporter = nodemailer.createTransport({
    host: ENV_VARS.SMTP_HOST,
    port: ENV_VARS.SMTP_PORT,
    secure: false,
    auth: {
        user: ENV_VARS.SMTP_USER,
        pass: ENV_VARS.SMTP_PASSWORD,
    },
});

export async function sendEmail(email: Email) {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const htmlBody = await ejs.renderFile(
            path.resolve(__dirname, "../views/emails/welcomeEmail.ejs"),
            { name: email.to }
        );

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
