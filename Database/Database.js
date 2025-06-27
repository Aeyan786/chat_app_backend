import mongoose from "mongoose";

const connectDB = async () => {
  try {
   const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Succesfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB