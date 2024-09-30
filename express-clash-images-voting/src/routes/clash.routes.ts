import { Router } from "express";
import ClashHandler from "../handlers/clash.handler.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const clashRouter: Router = Router();

clashRouter.post("/", verifyToken, ClashHandler.createClash);
clashRouter.get("/all", verifyToken, ClashHandler.getAllClash);
clashRouter.get("/:id", ClashHandler.getClashById);
clashRouter.put("/update/:id", verifyToken, ClashHandler.updateClash);
clashRouter.delete("/:id", verifyToken, ClashHandler.deleteClash);

// clash items routes
clashRouter.post("/items", verifyToken, ClashHandler.createClashItem);

export default clashRouter;
