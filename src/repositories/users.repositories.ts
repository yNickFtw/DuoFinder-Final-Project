import { User, CreateUserDTO, UpdateUserDTO } from "../models/user.model";

class UserRepository {
  async getAllUsers() {
    return await User.find().select(
      "-password -announcements.userId -announcements.updatedAt -announcements.__v -announcements.nickname -announcements.ageUser -announcements.discordUser -announcements.createdAt"
    );
  }

  async registerUser(user: CreateUserDTO) {
    return await User.create(user);
  }

  async updateUser(id: string, updatedUser: UpdateUserDTO) {
    return await User.updateOne({ _id: id }, { $set: updatedUser });
  }

  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }

  async checkIfUserExistsByEmail(email: string) {
    return await User.findOne({ email: email });
  }

  async findById(id: string) {
    const user = await User.findById(id).select(
      "-password -announcements.nickname -announcements.ageUser -announcements.discordUser -announcements.hourAvaibility -announcements.createdAt -announcements.game"
    );
    return user;
  }

  async deleteAnnouncementFromUser(userId: string, announcementId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const announcementIndex = user.announcements.findIndex(
      (announcement) => announcement._id.toString() === announcementId
    );

    if (announcementIndex === -1) {
      throw new Error("Anúncio não encontrado");
    }

    user.announcements.splice(announcementIndex, 1);
    await user.save();
  }
}

export default new UserRepository();
