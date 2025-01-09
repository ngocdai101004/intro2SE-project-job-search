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
  isFollowed,
  getAllCompaniesByOwnerAdmin,
} from "../controllers/companyController";

const router = Router();

router.post("/", verifyUser, createCompany);

router.get("/", getAllCompanies);
router.put("/:companyID", verifyUser, updateCompany);

router.get("/:companyID", getCompany);
router.delete("/:companyID", verifyUser, deleteCompany);

router.get("/:companyID/isFollowed", verifyUser, isFollowed);
router.post("/:companyID/follow", verifyUser, followCompany);
router.post("/:companyID/unfollow", verifyUser, unfollowCompany);

router.post("/:companyID/review", verifyUser, reviewCompany);
router.delete("/:companyID/review", verifyUser, deleteCompanyReview);
router.get("/:companyID/isReviewed", verifyUser, isReviewed);

router.get("/:companyID/reviews", getCompanyReviews);

router.post("/build-company", verifyUser, createCompany);
router.get("/view-company/:userID", getAllCompaniesByOwnerAdmin);

export default router;
