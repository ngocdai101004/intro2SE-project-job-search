import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
