import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const message = mongoose.model("message", messageSchema);
