import { Kafka } from "kafkajs";
import { ENV_VARS } from "../utils/envVariables.js";

// For kafka running locally
const kafka = new Kafka({
    clientId: ENV_VARS.KAFKA_CLIENT_ID,
    brokers: [ENV_VARS.KAFKA_BROKER],
});

export default kafka;
