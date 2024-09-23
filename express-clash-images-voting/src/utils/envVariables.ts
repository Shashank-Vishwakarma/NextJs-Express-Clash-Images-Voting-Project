import "dotenv/config";

export const ENV_VARS = {
    APPLICATION_PORT: process.env.APPLICATION_PORT || 5000,
    CLIENT_APP_URL: process.env.CLIENT_APP_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    FROM_EMAIL: process.env.FROM_EMAIL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    EMAIL_QUEUE_NAME: process.env.EMAIL_QUEUE_NAME,
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
    KAFKA_BROKER: process.env.KAFKA_BROKER,
};
