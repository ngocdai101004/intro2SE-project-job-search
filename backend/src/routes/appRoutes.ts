import {Router} from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import companyRoutes from "./companyRoutes";
import jobRoutes from "./jobRoutes";
import chatRoute from "./chatRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/company", companyRoutes);
router.use("/job", jobRoutes);
router.use("/chat", chatRoute);

export default router;
