import { Redis } from "ioredis";
import { ConnectionOptions } from "bullmq";

import { ENV_VARS } from "../utils/envVariables.js";

const redis: ConnectionOptions = new Redis({
    host: ENV_VARS.REDIS_HOST,
    port: Number(ENV_VARS.REDIS_PORT),
    maxRetriesPerRequest: null,
});

export default redis;
