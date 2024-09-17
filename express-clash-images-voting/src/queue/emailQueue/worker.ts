import { Job, Worker } from "bullmq";
import { ENV_VARS } from "../../utils/envVariables.js";
import redis from "../../config/redis.config.js";
import { sendEmail } from "../../config/nodemailer.config.js";
import { Email } from "../../types/emailType.js";

const worker = new Worker(
    ENV_VARS.EMAIL_QUEUE_NAME,
    async (job: Job) => {
        try {
            const email: Email = job.data;
            await sendEmail(email);
        } catch (error) {
            throw error;
        }
    },
    { connection: redis }
);

worker.on("completed", async (job) => {
    console.log("Email sent to: ", job.data.email);
});

worker.on("failed", async (job) => {
    console.log("Email failed to send to: ", job.data.email);
});
