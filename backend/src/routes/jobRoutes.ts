import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { verifyAdmin } from "../middlewares/verifyAdmin";

import {
  createJob,
  getJobs,
  getJobByID,
  getRecommendedJobs,
} from "../controllers/jobController";

const router = Router();

router.post("/create", verifyUser, verifyAdmin, createJob);
router.get("/", getJobs);
router.get("/recommended", verifyUser, getRecommendedJobs);
router.get("/:jobID", getJobByID);

export default router;
