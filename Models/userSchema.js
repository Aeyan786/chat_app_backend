import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
