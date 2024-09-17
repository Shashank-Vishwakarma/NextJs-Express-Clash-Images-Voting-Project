import { Job } from "bullmq";
import { emailQueue } from "../../config/queue.config.js";
import { ENV_VARS } from "../../utils/envVariables.js";
import { Email } from "../../types/emailType.js";

export async function addEmailToQueue(email: Email) {
    try {
        const job: Job = await emailQueue.add(ENV_VARS.EMAIL_QUEUE_NAME, {
            ...email,
        });

        return { messageId: job.id };
    } catch (error) {
        console.log("Error in adding email to queue: ", error);
        return { error: error.message };
    }
}
