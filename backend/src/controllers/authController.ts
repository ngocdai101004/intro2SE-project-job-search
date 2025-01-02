import { Request, Response } from "express";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import { generateRandomSixDigitString } from "../utils/generateVerifyCode";
import { sendEmail } from "../utils/sendEmail";
import {
  IGetVerifyCodeRequest,
  ILoginRequest,
  IRegisterRequest,
  IResetPasswordRequest,
  IVerifiedRequest,
  IVerifyAccountRequest,
} from "../interfaces/interfaces";

require("dotenv").config();

// Check if user is verified
const checkUser = async (req: IVerifiedRequest, res: Response) => {
  if (req.body.isVerified) {
    res.status(200).json({
      message: "User is verified",
      data: {
        userID: req.body.userID,
        isVerified: req.body.isVerified,
      },
    });
  } else {
    res.status(400).json({
      message: "User is not verified",
      data: {
        isVerified: req.body.isVerified,
      },
    });
  }
};

// Login user
const loginUser = async (req: ILoginRequest, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please fill in all fields" });
    return;
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, {
      userID: user._id.toString(),
      isVerified: user.is_verified,
    });
    res.status(200).json({
      name: user.first_name + " " + user.last_name,
      email: user.email,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Logout user
const logoutUser = (req: Request, res: Response): void => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

// Register user
const registerUser = async (req: IRegisterRequest, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    res.status(400).json({ message: "Please fill in all fields" });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const code = generateRandomSixDigitString();

  sendEmail(
    email,
    "Verify your email at job search",
    `Your verification code is: ${code}`
  );

  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
    is_verified: false,
    verification_code: code,
  });
  if (user) {
    generateToken(res, {
      userID: user._id.toString(),
      isVerified: user.is_verified,
    });
    res.status(201).json({
      _id: user._id,
      name: user.first_name + " " + user.last_name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Verify email
const verifyEmail = async (req: IVerifyAccountRequest, res: Response) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).json({ message: "Code not found" });
    return;
  }
  const user = await User.findById(req.body.userID);
  if (user) {
    if (user.verification_code === code) {
      user.is_verified = true;
      user.verification_code = "";
      await user.save();
      generateToken(res, {
        userID: user._id.toString(),
        isVerified: user.is_verified,
      });
      res.status(200).json({ message: "Email verified" });
    } else {
      res.status(400).json({ message: "Invalid code" });
    }
  } else {
    res.status(400).json({ message: "User not found" });
  }
};

// Get verification code
const getVerifyCode = async (req: IGetVerifyCodeRequest, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email not found" });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  try {
    const code = generateRandomSixDigitString();
    user.verification_code = code;
    await user.save();
    await sendEmail(
      email,
      "Verify your email at job search",
      `Your verification code is: ${code}`
    );
    res.status(200).json({ message: "Code sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Code not sent" });
  }
};

const resetPassword = async (req: IResetPasswordRequest, res: Response) => {
  const { email, password, code } = req.body;

  if (!email || !password || !code) {
    res.status(400).json({ message: "Please fill in all fields" });
    return;
  }
  const user = await User.findOne({ email });
  if (user) {
    if (user.verification_code === "") {
      res.status(400).json({ message: "Verify code not found" });
    } else if (user.verification_code === code) {
      user.password = password;
      user.verification_code = "";
      await user.save();
      res.status(200).json({ message: "Password reset" });
    } else {
      res.status(400).json({ message: "Invalid code" });
      console.log(user);
    }
  } else {
    res.status(400).json({ message: "User not found" });
  }
};

export {
  checkUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
  getVerifyCode,
  resetPassword,
};
