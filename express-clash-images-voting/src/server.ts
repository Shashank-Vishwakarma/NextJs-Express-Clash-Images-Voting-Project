import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import { ENV_VARS } from "./utils/envVariables.js";

const app: Application = express();

// view engine setup
app.set("view engine", "ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.resolve(__dirname, "./views"));

// middleware to parse req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware for cors
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    })
);

// middleware for response headers
app.use(helmet());

// bullmq workers to consume the jobs
import "./queue/jobs.js";

app.listen(ENV_VARS.APPLICATION_PORT, () => {
    console.log(
        `Express server listening on port ${ENV_VARS.APPLICATION_PORT}`
    );
});
