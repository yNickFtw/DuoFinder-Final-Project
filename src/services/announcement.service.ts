import AnnouncementRepository from "../repositories/announcement.repository";
import {
  createAnnouncementDTO,
  UpdateAnnouncementDTO,
} from "../models/announcement.model";
import UsersRepository from "../repositories/users.repositories";
import GameRepository from "../repositories/game.repositories";

class AnnouncementServices {
  async createAnnouncement(
    hourAvaibility: string,
    description: string,
    userId: string,
    gameId: string
  ) {
    try {
      const userExists = await UsersRepository.findById(userId);

      const gameExists: any = await GameRepository.getGameById(gameId);

      if (!gameExists) {
        throw new Error("Jogo não encontrado");
      }

      if (!userExists) {
        throw new Error("Usuário não encontrado");
      }

      if (
        !userExists.nickname ||
        !userExists.discordUser ||
        !userExists.ageUser ||
        !hourAvaibility ||
        !description
      ) {
        throw new Error("Preencha todos os campos!");
      }

      const newAnnouncement: createAnnouncementDTO = {
        nickname: userExists.nickname,
        discordUser: userExists.discordUser,
        ageUser: userExists.ageUser,
        userId: userId,
        hourAvaibility: hourAvaibility.toString(),
        description: description,
        game: gameExists.name,
        createdAt: new Date(),
      };

      const announcement = await AnnouncementRepository.createAnnouncement(
        newAnnouncement,
        userId,
        gameId
      );

      return announcement;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAnnouncements() {
    try {
      const announcements = await AnnouncementRepository.getAllAnnouncements();

      if (!announcements) {
        throw new Error("Não há nenhum anúncio");
      }

      return announcements;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAnnouncementById(announcementId: string) {
    try {
      const announcement = await AnnouncementRepository.findById(
        announcementId
      );

      if (!announcement) {
        throw new Error("Anúncio não encontrado");
      }

      return announcement;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateAnnouncement(
    userId: string,
    announcementId: string,
    description: string,
    hourAvaibility: string
  ) {
    try {
      const checkIfAnnouncementExists = await AnnouncementRepository.findById(
        announcementId
      );

      if (!checkIfAnnouncementExists) {
        throw new Error("Anúncio não encontrado!");
      }

      const checkIfUserExists = await UsersRepository.findById(userId);

      if (!checkIfUserExists) {
        throw new Error("Usuário não encontrado!");
      }

      const checkIfUserIsOwner =
        await AnnouncementRepository.checkIfUserIsOwner(userId, announcementId);

      if (!checkIfUserIsOwner) {
        throw new Error("Vocë não é dono deste anúncio!");
      }

      if (!checkIfAnnouncementExists) {
        throw new Error("Usuário não encontrado!");
      }

      if (!userId || !announcementId || !description || !hourAvaibility) {
        throw new Error("Preencha todos os campos!");
      }

      const updatedAnnouncement: UpdateAnnouncementDTO = {
        description: description,
        hourAvaibility: hourAvaibility,
        updatedAt: new Date(),
      };

      const updatedAnnouncementDB =
        await AnnouncementRepository.updateAnnouncement(
          announcementId,
          updatedAnnouncement
        );

      return updatedAnnouncementDB;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteAnnouncement(userId: string, announcementId: string) {
    try {
      const checkIfAnnouncementExists = await AnnouncementRepository.findById(
        announcementId
      );

      if (!checkIfAnnouncementExists) {
        throw new Error("Anúncio não encontrado!");
      }

      const checkIfUserExists = await UsersRepository.findById(userId);

      if (!checkIfUserExists) {
        throw new Error("Usuário não encontrado!");
      }

      const checkIfUserIsOwner =
        await AnnouncementRepository.checkIfUserIsOwner(userId, announcementId);

      if (!checkIfUserIsOwner) {
        throw new Error("Vocë não é dono deste anúncio!");
      }

      const deletedAnnouncement =
        await AnnouncementRepository.deleteAnnouncement(announcementId);

      const announcementDeletedFromUser =
        await UsersRepository.deleteAnnouncementFromUser(
          userId,
          announcementId
        );

      return { deletedAnnouncement, announcementDeletedFromUser };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export default new AnnouncementServices();
