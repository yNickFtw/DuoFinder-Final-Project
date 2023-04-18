import mongoose, { Schema } from "mongoose";

export interface CreateGameDTO {
  name: string;
  imageUrl: string;
  admin: object;
  createdAt: Date;
}

export interface UpdateGameDTO {
  name: string;
  imageUrl: string;
  adminEdited: object;
  updatedAt: Date;
}

export const gameSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  adminId: {
    type: Object,
  },
  announcements: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Game = mongoose.model("games", gameSchema);
