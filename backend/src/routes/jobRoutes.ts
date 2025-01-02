import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import {
  createJob,
  getJobs,
  getJobsByCompanyId,
} from "../controllers/jobController";

const router = Router();

router.post("/create", verifyUser, verifyAdmin, createJob);
router.get("/", getJobs);
router.get("/:companyId", getJobsByCompanyId);

export default router;
