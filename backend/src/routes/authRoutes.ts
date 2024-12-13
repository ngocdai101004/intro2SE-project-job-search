import express from 'express';
const router = express.Router();
import {
    loginUser,
    registerUser,
    logoutUser,
    verifyEmail,
    getVerifyCode,
    resetPassword
} from "../controllers/authController";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/email/verify", verifyEmail);
router.post("/email/code", getVerifyCode);
router.post("/password/reset", resetPassword);

export default router;
