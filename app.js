import express from "express";
import dotenv from "dotenv";
import connectDB from "./Database/Database.js";
import userRoutes from "./Router/userRoutes.js";
import messageRoutes from "./Router/messageRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./Socket/socket.js"
dotenv.config({});


const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "https://chat-app-frontend-peach-nine.vercel.app",
  credentials: true,
};
app.use(cors(corsOption));


// API Routes

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
