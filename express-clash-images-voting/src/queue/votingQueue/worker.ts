import { Worker } from "bullmq";
import { ENV_VARS } from "../../utils/envVariables.js";
import redis from "../../config/redis.config.js";
import { incrementVoteByOne } from "../../utils/database.js";

const worker = new Worker(
    ENV_VARS.VOTE_QUEUE_NAME,
    async (job) => {
        await incrementVoteByOne(job.data.clashId, job.data.clashItemId);
    },
    { connection: redis }
);

worker.on("completed", async (job) => {
    console.log("Voted successfully", job.data);
});

worker.on("failed", async (job) => {
    console.log("Voting failed", job.data);
});
