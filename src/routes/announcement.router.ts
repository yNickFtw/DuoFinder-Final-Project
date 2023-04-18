import { Router } from "express";
import AnnouncementeController from "../controllers/announcemente.controller";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

const router = Router();

router.post(
  "/:id",
  authorizationMiddleware,
  AnnouncementeController.createAnnouncement
);
router.put(
  "/:id",
  authorizationMiddleware,
  AnnouncementeController.updateAnnouncement
);
router.delete(
  "/:id",
  authorizationMiddleware,
  AnnouncementeController.deleteAnnouncement
);
router.get(
  "/:id",
  authorizationMiddleware,
  AnnouncementeController.getAnnouncementById
);
router.get(
  "/",
  authorizationMiddleware,
  AnnouncementeController.getAllAnnouncements
);

export default router;
