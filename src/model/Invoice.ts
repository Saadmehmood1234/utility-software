import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
  {
    invoiceNo: { type: String, required: true },
    date: { type: Date, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    customerName: { type: String },
    previousReading: { type: Number, required: true },
    currentReading: { type: Number, required: true },
    rentAmount: { type: Number, required: true },
    freeCopies: { type: Number, required: true },
    ratePerReading: { type: Number, required: true },
    gstType: { type: String, enum: ["cgst", "igst"], required: true },
    netPayableReading: { type: Number },
    totalT1: { type: Number },
    gstAmount: { type: Number },
    totalAmount: { type: Number },
  },
  { timestamps: true }
);

export const Invoice =
  mongoose.models?.Invoice || model("Invoice", invoiceSchema);
