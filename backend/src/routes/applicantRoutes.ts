import { Router } from "express";
import {
  getApplicantInfos,
  updateApplicantFeedback,
  updateApplicantStatus,
} from "../controllers/applicantController";

const router = Router();

router.get("/:companyId", getApplicantInfos);
router.patch("/:applicantId/feedback", updateApplicantFeedback);
router.patch("/:applicantId/status", updateApplicantStatus);

export default router;
