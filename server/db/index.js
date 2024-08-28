import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance =  await mongoose.connect(`${process.env.MONGODB}`);
    console.log("MONGODB CONNECTION SUCCESSFUL" , connectionInstance.connection.host );
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED");
    process.exit(0);
  }
};

export default connectDB;