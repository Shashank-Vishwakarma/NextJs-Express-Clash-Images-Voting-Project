import { Router } from "express";
import AuthHandler from "../handlers/auth.handler.js";

const authRouter: Router = Router();

authRouter.post("/signup", AuthHandler.signup);
authRouter.post("/login", AuthHandler.login);
authRouter.get("/logout", AuthHandler.logout);
authRouter.post("/forgot-password", AuthHandler.forgotPassword);
authRouter.get("/verify-email/:token/:email", AuthHandler.verifyEmail);

export default authRouter;
