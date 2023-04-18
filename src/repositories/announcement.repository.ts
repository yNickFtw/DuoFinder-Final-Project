import { Announcement } from "../models/announcement.model";
import {
  createAnnouncementDTO,
  UpdateAnnouncementDTO,
} from "../models/announcement.model";
import { Game } from "../models/game.model";
import { User } from "../models/user.model";

class AnnouncementRepository {
  async createAnnouncement(
    announcement: createAnnouncementDTO,
    userId: string,
    gameId: string
  ) {
    const newAnnouncement = await Announcement.create(announcement);

    const gameAnnouncement = await Game.updateOne(
      { _id: gameId },
      { $push: { announcements: newAnnouncement } }
    );
    const userAnnouncement = await User.updateOne(
      { _id: userId },
      { $push: { announcements: newAnnouncement } }
    );
    return { newAnnouncement, userAnnouncement };
  }

  async updateAnnouncement(
    id: string,
    updatedAnnouncement: UpdateAnnouncementDTO
  ) {
    return await Announcement.findByIdAndUpdate(id, updatedAnnouncement);
  }

  async deleteAnnouncement(id: string) {
    const announcementDeleted = Announcement.findByIdAndDelete(id);
    return announcementDeleted;
  }

  async findById(id: string) {
    return Announcement.findById(id);
  }

  getAllAnnouncements() {
    return Announcement.findOne();
  }

  checkIfUserIsOwner(userId: string, announcementId: string) {
    return Announcement.findOne({ _id: announcementId, userId: userId });
  }
}

export default new AnnouncementRepository();
