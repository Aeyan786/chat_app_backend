import express from "express";
import {
  getOtherUsers,
  login,
  logout,
  register,
} from "../Controllers/userController.js";
import authentication from "../Middlewares/middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/get").get(authentication, getOtherUsers);

export default router;
