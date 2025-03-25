import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String },
    mobile: { type: String },
    address: { type: String },
    gstNumber: { type: String },
    currentReading: { type: Number },
  },
  { timestamps: true }
);

export const CustomerModel =
  mongoose.models?.Customer || model("Customer", customerSchema);
