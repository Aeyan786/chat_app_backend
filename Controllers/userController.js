import { User } from "../Models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
      profilePhoto,
    } = req.body;
   

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const userNameExists = await User.findOne({ userName });

    if (userNameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password doesn't matched",
      });
    }

    const avatar = `https://ui-avatars.com/api/?name=${userName}`;

    const encryptPassword = await bcrypt.hash(password, 10);

    const userObj = {
      fullName,
      userName,
      password: encryptPassword,
      confirmPassword,
      gender,
      profilePhoto: avatar,
    };

    await User.create(userObj);

    return res.status(200).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }
    const isUser = await User.findOne({ userName });
    

    
    if (!isUser) {
      return res.status(400).json({
        message: "Invaild username or password",
      });
    }
    
    const matchPassword = await bcrypt.compare(password, isUser.password);
    
    if (!matchPassword) {
      return res.status(400).json({
        message: "Invaild username or password",
      });
    }

    const tokenData = {
      user: isUser._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        id: isUser._id,
        username: isUser.userName,
        fullname: isUser.fullName,
        profilePhoto: isUser.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUser = req.id;
    
    const AllOtherUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json({
      message: "Users Found",
      AllOtherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};
