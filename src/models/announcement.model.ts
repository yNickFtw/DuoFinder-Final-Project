import mongoose, { Schema } from "mongoose";

export interface createAnnouncementDTO {
  nickname: string;
  ageUser: string;
  discordUser: string;
  userId: string;
  hourAvaibility: string;
  description: string;
  game: string;
  createdAt: Date;
}

export interface UpdateAnnouncementDTO {
  hourAvaibility: string;
  description: string;
  updatedAt: Date;
}

export const announcementSchema = new Schema({
  nickname: {
    type: String,
    require: true,
  },
  ageUser: {
    type: String,
    require: true,
  },
  discordUser: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  hourAvaibility: {
    type: String,
    require: true,
  },
  game: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const Announcement = mongoose.model("announcement", announcementSchema);
