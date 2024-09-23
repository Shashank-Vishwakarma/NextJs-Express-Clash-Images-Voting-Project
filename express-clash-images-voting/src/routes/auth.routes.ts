import { Router } from "express";
import AuthHandler from "../handlers/auth.handler.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const authRouter: Router = Router();

authRouter.post("/signup", AuthHandler.signup);
authRouter.post("/login", AuthHandler.login);
authRouter.get("/logout", verifyToken, AuthHandler.logout);
authRouter.post(
    "/generate-password-reset-token",
    AuthHandler.generateResetToken
);
authRouter.post("/reset-password", AuthHandler.resetPassword);
authRouter.get("/verify-email/:token/:email", AuthHandler.verifyEmail);

export default authRouter;
