import { Request, Response } from "express";
import User from "../models/userModel";
import UserInfo from "../models/userInfoModel";
import { IGetUserProfileRequest } from "../interfaces/interfaces";

// Get user profile

const getUserProfile = async (req: IGetUserProfileRequest, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.body.userID });
    if (user) {
      const userInfo = await UserInfo.findOne({ user_id: req.body.userID });
      if (userInfo) {
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
          user: userWithoutPassword,
          userInfo,
        });
      } else {
        res.status(400).json({ message: "User info not found" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export { getUserProfile };
