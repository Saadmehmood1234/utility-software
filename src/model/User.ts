import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const Admin = mongoose.models?.Admin || model("Admin", adminSchema);
