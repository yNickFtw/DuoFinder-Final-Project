import { Router } from "express";
import announcementRoutes from "./announcement.router";
import gamesRoutes from "./game.router";
import usersRoutes from "./user.router";
import adminRoutes from "./admin.router";

const router = Router();

router.use("/users", usersRoutes);
router.use("/announcements", announcementRoutes);
router.use("/admin", adminRoutes);
router.use("/games", gamesRoutes);

export default router;
