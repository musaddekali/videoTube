import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}. DB name: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log(`MongoDB connection FAILED ${error}`);
  }
};

export default connectDB;
