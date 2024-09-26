import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import { ENV_VARS } from "./utils/envVariables.js";
import authRouter from "./routes/auth.routes.js";

// bullmq workers to consume the jobs
import "./queue/jobs.js";
import {
    rateLimiterForApp,
    rateLimiterForAuth,
} from "./middlewares/rateLimiting.js";

const app: Application = express();

// rate limit for application
app.use(rateLimiterForApp);

// view engine setup
app.set("view engine", "ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.resolve(__dirname, "./views"));

// middleware to parse req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware to parse cookies
app.use(cookieParser());

// middleware for cors
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    })
);

// middleware for response headers
app.use(helmet());

// auth routes
app.use("/api/v1/auth", rateLimiterForAuth, authRouter);

app.listen(ENV_VARS.APPLICATION_PORT, () => {
    console.log(
        `Express server listening on port ${ENV_VARS.APPLICATION_PORT}`
    );
});
