import { Worker } from "bullmq";
import { ENV_VARS } from "../../utils/envVariables.js";
import redis from "../../config/redis.config.js";
import { addCommentInDatabase } from "../../utils/database.js";

const worker = new Worker(
    ENV_VARS.COMMENT_QUEUE_NAME,
    async (job) => {
        await addCommentInDatabase(job.data);
    },
    { connection: redis }
);

worker.on("completed", async (job) => {
    console.log("comment added successfully", job.data);
});

worker.on("failed", async (job) => {
    console.log("failed to add comment", job.data);
});
