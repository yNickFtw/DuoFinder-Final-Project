import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

const router = Router();

router.post("/auth/register", UserController.registerUser);
router.post("/auth/login", UserController.loginUser);
router.get("/", authorizationMiddleware, UserController.getUsers);
router.put("/update", authorizationMiddleware, UserController.updateUser);
router.get("/:id", authorizationMiddleware, UserController.getUserById);
router.delete("/delete", authorizationMiddleware, UserController.deleteUser);

export default router;
