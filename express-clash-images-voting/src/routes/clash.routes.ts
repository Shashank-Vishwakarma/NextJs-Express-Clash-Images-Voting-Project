import { Router } from "express";
import ClashHandler from "../handlers/clash.handler.js";

const clashRouter: Router = Router();

clashRouter.post("/", ClashHandler.createClash);
clashRouter.get("/all", ClashHandler.getAllClash);
clashRouter.get("/:id", ClashHandler.getClashById);
clashRouter.put("/update/:id", ClashHandler.updateClash);
clashRouter.delete("/:id", ClashHandler.deleteClash);

export default clashRouter;
