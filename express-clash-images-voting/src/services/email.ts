import { transporter } from "../config/nodemailer.config.js";
import { ENV_VARS } from "../utils/envVariables.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

export async function sendEmail(to: string, subject: string) {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const htmlBody = await ejs.renderFile(
            path.resolve(__dirname, "../views/emails/welcomeEmail.ejs"),
            { name: to }
        );

        const info = await transporter.sendMail({
            from: ENV_VARS.FROM_EMAIL,
            to,
            subject,
            html: htmlBody,
        });

        return { messageId: info.messageId };
    } catch (error) {
        console.log("Error sending the email: ", error);
        return { error: error.message };
    }
}
