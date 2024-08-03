import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://viralmistry240:UUzuYoBMyLCNdQCJ@jayparmatma.udhaxfx.mongodb.net/JayParmatma?retryWrites=true&w=majority', {
      useUnifiedTopology: true, // Keep this option for handling multiple connections efficiently
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
