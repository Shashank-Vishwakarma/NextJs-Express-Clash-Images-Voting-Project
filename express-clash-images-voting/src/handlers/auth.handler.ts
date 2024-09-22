import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import {
    loginSchemaValidation,
    signUpSchemaValidation,
} from "../validations/authSchema.validation.js";
import prisma from "../database/prisma.js";
import { ZodError } from "zod";
import { generateToken } from "../utils/generateToken.js";
import { addEmailToQueue } from "../queue/emailQueue/producer.js";
import { ENV_VARS } from "../utils/envVariables.js";
import { Email, VERIFY_EMAIL } from "../types/emailType.js";

class AuthHandler {
    static async signup(request: Request, response: Response) {
        const body = request.body;
        const { data, error } = signUpSchemaValidation.safeParse(body);
        if (error) {
            return response.status(400).json({
                error: error.message,
            });
        }

        try {
            // find user
            const user = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (user && user.isEmailVerified) {
                return response.status(400).json({
                    error: "You already have an account. Please login.",
                });
            } else if (user && !user.isEmailVerified) {
                return response.status(400).json({
                    error: "Please verify your email address",
                });
            }

            // hash the password
            const hashesPassword = await bcrypt.hash(data.password, 10);

            // generate email verification token
            const emailVerifyToken = uuidv4();

            // save the user in database
            const newUser = await prisma.user.create({
                data: {
                    email: data.email,
                    password: hashesPassword,
                    name: data.name,
                    email_verify_token: emailVerifyToken,
                },
            });

            // send verification email
            const email: Email = {
                from: ENV_VARS.FROM_EMAIL,
                to: newUser.email,
                subject: "Email verification",
                type: VERIFY_EMAIL,
                token: emailVerifyToken,
            };
            await addEmailToQueue(email);

            return response.status(200).json({
                success: true,
                message:
                    "Please verify your email address by checking your email",
            });
        } catch (error) {
            console.log("Error in signup: ", error);
            if (error instanceof ZodError) {
                return response.status(400).json({
                    error: "Zod Error",
                });
            }

            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static async login(request: Request, response: Response) {
        const body = request.body;
        const { data, error } = loginSchemaValidation.safeParse(body);
        if (error) {
            return response.status(400).json({
                error: error.message,
            });
        }

        try {
            // find user
            const user = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (!user) {
                return response.status(404).json({
                    error: "User not found",
                });
            }

            // check if user has verified the email
            if (!user.isEmailVerified) {
                return response.status(401).json({
                    error: "Please verify your email address",
                });
            }

            // hash the password
            const isPasswordMatch = await bcrypt.compare(
                data.password,
                user.password
            );
            if (!isPasswordMatch) {
                return response.status(400).json({
                    error: "Incorrect Password",
                });
            }

            // generate access token
            const accessToken = generateToken(user.id);

            return response
                .cookie("access_token", accessToken, {
                    httpOnly: true,
                    sameSite: "strict",
                })
                .status(200)
                .json({
                    success: true,
                    message: "Login successful",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
        } catch (error) {
            console.log("Error in login: ", error);
            if (error instanceof ZodError) {
                return response.status(400).json({
                    error: "Zod Error",
                });
            }

            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static logout(request: Request, response: Response) {
        try {
            // clear the cookie
            response.clearCookie("access_token", { maxAge: 0 });

            return response.status(200).json({
                message: "Logout successful",
                success: true,
            });
        } catch (error) {
            console.log("Error in logout: ", error);
            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static async verifyEmail(request: Request, response: Response) {
        const { token, email } = request.params;
        if (!token || !email) {
            return response.status(404).json({
                error: "Invalid credentials",
            });
        }

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return response.status(404).json({
                    error: "User not found",
                });
            }

            // verify token
            if (user.email_verify_token !== token) {
                return response.status(400).json({
                    error: "Invalid token",
                });
            }

            // token expiry
            const isVerificationTokenExpired =
                user.email_verification_token_sent_time.getTime() +
                    1 * 60 * 60 * 1000 <
                Date.now();
            if (isVerificationTokenExpired) {
                return response.status(400).json({
                    error: "Token has expired. Please try to verify again",
                });
            }

            // update user
            await prisma.user.update({
                where: { email },
                data: {
                    isEmailVerified: true,
                },
            });
            return response.status(200).json({
                success: true,
                message: "Email verified successfully. Please sign in.",
            });
        } catch (error) {
            console.log("Error in verifyEmail: ", error);
            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static async forgotPassword(request: Request, response: Response) {}
}

export default AuthHandler;
