import express from "express";

import authentication from "../Middlewares/middleware.js";
import { getMessages, sendMessages } from "../Controllers/messageController.js";

const router = express.Router();

router.route("/send/:id").post(authentication,sendMessages);
router.route("/get/:id").get(authentication,getMessages);


export default router;
