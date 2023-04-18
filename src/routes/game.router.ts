import { Router } from "express";
import GameController from "../controllers/game.controller";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

const router = Router();

router.post("/", authorizationMiddleware, GameController.createGame);
router.put("/:id", authorizationMiddleware, GameController.editGame);
router.get("/", authorizationMiddleware, GameController.getAllGames);
router.get("/:id", authorizationMiddleware, GameController.getGameById);

export default router;
