import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { ENV_VARS } from "./utils/envVariables.js";

const app: Application = express();

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

app.listen(ENV_VARS.PORT, () => {
    console.log(`Express server listening on port ${ENV_VARS.PORT}`);
});
