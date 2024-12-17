import {NextFunction, Request, Response} from "express";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
// import mongoose from "mongoose";

require("dotenv").config();




interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}

const loginUser = async (req: LoginRequest, res: Response) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        console.log("User found");
        generateToken(res, {userID: user._id, isVerified: user.is_verified});
        res.status(200).json({
            name: user.first_name + " " + user.last_name,
            email: user.email,
        });
    } else {
        res.status(401).json({message: "Invalid email or password"});
    }
}



const logoutUser = (req: Request, res: Response): void => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed'});
    }
};


interface RegisterRequest extends Request {
    body: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    }
}

const registerUser = async (req: RegisterRequest, res: Response, next: NextFunction) => {
    const {first_name, last_name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400).json({message: "User already exists"});
        throw new Error("User already exists");
    }
    const user = await User.create({first_name, last_name, email, password, is_verified: false, verification_code: "123123"});
    if (user) {
        generateToken(res, {userID: user._id, isVerified: user.is_verified});
        res.status(201).json({
            _id: user._id,
            name: user.first_name + " " + user.last_name,
            email: user.email,
        });
    } else {
        res.status(400).json({message: "Invalid user data"});
        throw new Error("Invalid user data");
    }
}
const sendVerificationEmail = async (req: Request, res: Response) => {

}
const verifyEmail = async (req: Request, res: Response) => {
}
const getVerifyCode = async (req: Request, res: Response) => {
}
const resetPassword = async (req: Request, res: Response) => {
}


export {
    loginUser,
    logoutUser,
    registerUser,
    verifyEmail,
    getVerifyCode,
    resetPassword,
    sendVerificationEmail
};