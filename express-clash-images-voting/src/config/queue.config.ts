import { Queue } from "bullmq";
import redis from "./redis.config.js";
import { ENV_VARS } from "../utils/envVariables.js";
import { defaultJobOptions } from "../queue/defaultOptions.js";

export const emailQueue = new Queue(ENV_VARS.EMAIL_QUEUE_NAME, {
    connection: redis,
    defaultJobOptions: defaultJobOptions,
});
