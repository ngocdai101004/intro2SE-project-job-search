import { Router } from "express";
import {
  getApplicantInfos,
  updateApplicantFeedback,
  updateApplicantStatus,
  saveApplicant,
  getApplicantCountsByJobId
} from "../controllers/applicantController";

const router = Router();

router.get("/:companyId", getApplicantInfos);
router.patch("/:applicantId/feedback", updateApplicantFeedback);
router.patch("/:applicantId/status", updateApplicantStatus);
router.post("/apply", saveApplicant);
router.get("/:jobId/job", getApplicantCountsByJobId);

export default router;
