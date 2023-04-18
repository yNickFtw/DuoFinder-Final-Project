import { Request, Response } from "express";
import AnnouncementServices from "../services/announcement.service";
import { getUserIdFromToken } from "../middlewares/getloggeduser.middleware";

class AnnouncementController {
  async createAnnouncement(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token);

      if (!userId) {
        return res.status(400).json({
          message: "Ocorreu um erro, por favor tente novamente mais tarde",
        });
      }

      const gameId = req.params.id;

      const { hourAvaibility, description } = req.body;

      const announcement = await AnnouncementServices.createAnnouncement(
        hourAvaibility,
        description,
        userId,
        gameId
      );

      return res.status(200).json(announcement);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateAnnouncement(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token);

      if (!userId) {
        return res
          .status(400)
          .json({ message: "Ocorreu um erro, tente novamente mais tarde!" });
      }

      const { description, hourAvaibility } = req.body;

      const announcementId = req.params.id;

      const updatedAnnouncement = await AnnouncementServices.updateAnnouncement(
        userId,
        announcementId,
        description,
        hourAvaibility
      );
      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        updatedAnnouncement,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteAnnouncement(req: Request, res: Response) {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token);

      if (!userId) {
        return res
          .status(400)
          .json({ message: "Ocorreu um erro, tente novamente mais tarde!" });
      }

      const announcementId = req.params.id;

      const deletedAnnouncement = await AnnouncementServices.deleteAnnouncement(
        userId,
        announcementId
      );

      return res.status(200).json({
        message: "Anúncio deletado com sucesso!",
        deletedAnnouncement,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllAnnouncements(req: Request, res: Response) {
    try {
      const announcements = await AnnouncementServices.getAnnouncements();

      return res.status(200).json(announcements);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAnnouncementById(req: Request, res: Response) {
    const announcementId = req.params.id;

    if (!announcementId) {
      return res.status(400).json({ message: "Informe o ID do anúncio" });
    }

    try {
      const announcement = await AnnouncementServices.getAnnouncementById(
        announcementId
      );

      return res.status(200).json(announcement);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new AnnouncementController();
