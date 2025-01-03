import {Router} from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import companyRoutes from "./companyRoutes";
import jobRoutes from "./jobRoutes";
import chatRoute from "./chatRoute";
import applicantRoutes from "./applicantRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/company", companyRoutes);
router.use("/job", jobRoutes);
router.use("/chat", chatRoute);
router.use("/applicant", applicantRoutes);

export default router;
