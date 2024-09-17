import nodemailer from "nodemailer";
import { ENV_VARS } from "../utils/envVariables.js";

export const transporter = nodemailer.createTransport({
    host: ENV_VARS.SMTP_HOST,
    port: ENV_VARS.SMTP_PORT,
    secure: false,
    auth: {
        user: ENV_VARS.SMTP_USER,
        pass: ENV_VARS.SMTP_PASSWORD,
    },
});
