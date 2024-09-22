import jwt from "jsonwebtoken";
import { ENV_VARS } from "./envVariables.js";

export const generateToken = (id: string) => {
    return jwt.sign({ id }, ENV_VARS.JWT_SECRET, { expiresIn: "30d" });
};
