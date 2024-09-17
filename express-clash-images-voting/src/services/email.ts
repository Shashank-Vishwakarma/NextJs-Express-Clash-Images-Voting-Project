import { transporter } from "../config/nodemailer.config.js";
import { ENV_VARS } from "../utils/envVariables.js";

export async function sendEmail(to: string, subject: string, body: string) {
    try {
        const info = await transporter.sendMail({
            from: ENV_VARS.FROM_EMAIL,
            to,
            subject,
            html: body,
        });

        return { messageId: info.messageId };
    } catch (error) {
        console.log("Error sending the email: ", error);
        return { error: error.message };
    }
}
