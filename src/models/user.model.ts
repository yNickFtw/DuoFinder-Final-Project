import mongoose, { Schema } from "mongoose";

export interface CreateUserDTO {
  nickname: string;
  email: string;
  password: string;
  ageUser: string;
  discordUser: string;
}

export interface UpdateUserDTO {
  nickname: string;
  ageUser: string;
  discordUser: string;
}

export const userSchema = new Schema({
  nickname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  discordUser: {
    type: String,
    require: true,
  },
  ageUser: {
    type: String,
    require: true,
  },
  announcements: {
    type: Array,
  },
});

export const User = mongoose.model("User", userSchema);
