import { Router } from "express";
import AdminController from "../controllers/admin.controller";

const router = Router();

router.post("/auth/register", AdminController.createAdmin); // Registe
router.post("/auth/login", AdminController.loginAdmin); // Login

export default router;
