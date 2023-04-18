import mongoose, { Schema, mongo } from "mongoose";

export interface CreateAdminDTO {
  admin: string;
  password: string;
  createdAt: Date;
}

export const adminSchema = new Schema({
  admin: {
    type: String,
  },
  password: {
    type: String,
  },
  createdGames: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
