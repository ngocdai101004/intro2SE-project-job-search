import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import companyRoutes from "./companyRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/company", companyRoutes);

export default router;
