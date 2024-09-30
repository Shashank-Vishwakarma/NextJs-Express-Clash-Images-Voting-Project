import { Job } from "bullmq";
import { votingQueue } from "../../config/queue.config.js";
import { ENV_VARS } from "../../utils/envVariables.js";

export async function incrementVoteThroughQueue(
    clashId: string,
    clashItemId: string
) {
    try {
        const job: Job = await votingQueue.add(ENV_VARS.VOTE_QUEUE_NAME, {
            clashId,
            clashItemId,
        });

        return { messageId: job.id };
    } catch (error) {
        console.log("Error in incrementVoteThroughQueue: ", error);
        return { error: error.message };
    }
}
