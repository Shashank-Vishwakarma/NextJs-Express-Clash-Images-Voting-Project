import { Job } from "bullmq";
import { commentQueue } from "../../config/queue.config.js";
import { ENV_VARS } from "../../utils/envVariables.js";

export async function addCommentToQueue(comment: any) {
    try {
        const job: Job = await commentQueue.add(
            ENV_VARS.COMMENT_QUEUE_NAME,
            comment
        );

        return { messageId: job.id };
    } catch (error) {
        console.log("Error in addCommentToQueue: ", error);
        return { error: error.message };
    }
}
