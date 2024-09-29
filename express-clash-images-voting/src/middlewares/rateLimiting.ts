import { rateLimit } from "express-rate-limit";

export const rateLimiterForAuth = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hr
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});

export const rateLimiterForApp = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hr
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});
