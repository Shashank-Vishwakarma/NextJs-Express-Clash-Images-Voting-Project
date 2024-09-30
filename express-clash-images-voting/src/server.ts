import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";

import { ENV_VARS } from "./utils/envVariables.js";
import authRouter from "./routes/auth.routes.js";

// bullmq workers to consume the jobs
import "./queue/jobs.js";
import {
    rateLimiterForApp,
    rateLimiterForAuth,
} from "./middlewares/rateLimiting.js";
import clashRouter from "./routes/clash.routes.js";

const app: Application = express();

// web socket setup
import { createServer } from "http";
import { setUpSocket } from "./socket.js";
const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
        methods: ["POST", "GET"],
    },
});

setUpSocket(io);

// file uploads
app.use(
    fileUpload({
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
    })
);

// server static files
app.use(express.static("public"));

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
        origin: [ENV_VARS.CLIENT_APP_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// middleware for response headers
app.use(helmet());

// auth routes
app.use("/api/v1/auth", rateLimiterForAuth, authRouter);

// clash routes
app.use("/api/v1/clash", clashRouter);

server.listen(ENV_VARS.APPLICATION_PORT, () => {
    console.log(
        `Express server listening on port ${ENV_VARS.APPLICATION_PORT}`
    );
});
