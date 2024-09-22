import prisma from "../database/prisma.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ENV_VARS } from "../utils/envVariables.js";
import { User } from "../types/userType.js";

export interface UserRequestInterface extends Request {
    user: User;
}

export default async function verifyToken(
    request: UserRequestInterface,
    response: Response,
    next: NextFunction
) {
    const token = request.cookies.access_token;
    if (!token) {
        return response.status(401).json({
            error: "Unauthorized - Token not found",
        });
    }

    try {
        const decodedPayload = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decodedPayload) {
            return response.status(401).json({
                error: "Unauthorized - Could not get decoded payload",
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: decodedPayload?.id },
        });
        if (!user) {
            return response.status(401).json({
                error: "Unauthorized - Could not find user",
            });
        }

        // add the user to the request object
        request.user = user;

        next();
    } catch (error) {
        console.log("Error in verifying token: ", error);
        return response.status(500).json({
            error: "Internal server error",
        });
    }
}
