import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Ensure DATABASE_URL is provided
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not defined");
    }

    // MongoDB connection options
    const mongooseOptions = {
      dbName: process.env.DATABASE_NAME || "HireHive",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
    };

    const connectionInstance = await mongoose.connect(
      process.env.DATABASE_URL,
      mongooseOptions
    );

    // Log successful connection
    console.log(
      `MongoDB Connected! DB Host: ${connectionInstance.connection.host}`
    );

    // Handle connection events
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection is disconnected");
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log(
          "Mongoose connection closed through app termination"
        );
        process.exit(0);
      } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("MongoDB connection error:", error?.message || error);
    process.exit(1); // Exit with failure code
  }
};

export default connectDB;