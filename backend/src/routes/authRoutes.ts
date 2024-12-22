import { NextFunction, Request, Response, Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { slowdownRequest } from "../utils/slowdownRequest";

import {
  checkUser,
  loginUser,
  registerUser,
  logoutUser,
  verifyEmail,
  getVerifyCode,
  resetPassword,
} from "../controllers/authController";

const router = Router();

// router.use(slowdownRequest)
router.get("/check", verifyUser, checkUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.post("/verify_account", verifyUser, verifyEmail);
router.post("/get_code", getVerifyCode);
router.post("/reset_password", resetPassword);

export default router;
