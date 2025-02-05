import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { verifyAdmin } from "../middlewares/verifyAdmin";

import {
  createJob,
  getJobs,
  getJobByID,
  getRecommendedJobs,
  getJobsByCompanyId,
  updateJobStatus,
} from "../controllers/jobController";

import { getJobsBySearching } from "../controllers/searchController";

const router = Router();

router.post("/create", verifyUser, verifyAdmin, createJob);
router.get("/", getJobs);
router.get("/company/:companyId", getJobsByCompanyId);
router.patch("/:jobID/status", updateJobStatus);
router.get("/recommended", verifyUser, getRecommendedJobs);
router.get("/search", getJobsBySearching);
router.get("/:jobID", getJobByID);

export default router;
