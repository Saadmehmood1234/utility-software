import mongoose from "mongoose";

export const dbConnect = async () => {
  const mongoUri = process.env.MONGO_URI!;
  if (!mongoUri) {
    console.log("Please provide a valid mongo uri");
    return;
  }
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to database");
      return;
    }
    await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected to: ${mongoUri} successfilly`);
  } catch (error) {
    console.error(`Error in mongoing connection: ${error}`);
  }
};