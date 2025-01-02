import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import {
  createCompany,
  updateCompany,
  getAllCompanies,
  getCompany,
  deleteCompany,
  followCompany,
  unfollowCompany,
  reviewCompany,
  deleteCompanyReview,
  getCompanyReviews,
  isReviewed,
} from "../controllers/companyController";

const router = Router();

router.post("/", verifyUser, createCompany);

router.get("/", getAllCompanies);
router.put("/:companyID", verifyUser, updateCompany);

router.get("/:companyID", getCompany);
router.delete("/:companyID", verifyUser, deleteCompany);

router.post("/:companyID/follow", verifyUser, followCompany);
router.post("/:companyID/unfollow", verifyUser, unfollowCompany);

router.post("/:companyID/review", verifyUser, reviewCompany);
router.delete("/:companyID/review", verifyUser, deleteCompanyReview);
router.get("/:companyID/isReviewed", verifyUser, isReviewed);

router.get("/:companyID/reviews", getCompanyReviews);

export default router;
