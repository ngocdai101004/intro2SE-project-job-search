import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import {
  createCompany,
  updateCompany,
  getCompany,
  deleteCompany,
  followCompany,
  unfollowCompany,
  reviewCompany,
  deleteCompanyReview,
  getCompanyReviews,
} from "../controllers/companyController";

const router = Router();

router.post("/", verifyUser, createCompany);
router.put("/:companyID", verifyUser, (req, res, next) => {
  updateCompany(req, res).catch(next);
});
router.get("/:companyID", (req, res, next) => {
  getCompany(req, res).catch(next);
});
router.delete("/:companyID", verifyUser, (req, res, next) => {
  deleteCompany(req, res).catch(next);
});

router.post("/:companyID/follow", verifyUser, (req, res, next) => {
  followCompany(req, res).catch(next);
});
router.post("/:companyID/unfollow", verifyUser, (req, res, next) => {
  unfollowCompany(req, res).catch(next);
});

router.post("/:companyID/review", verifyUser, (req, res, next) => {
  reviewCompany(req, res).catch(next);
});

router.delete("/:companyID/review", verifyUser, (req, res, next) => {
  deleteCompanyReview(req, res).catch(next);
});

router.get("/:companyID/reviews", (req, res, next) => {
  getCompanyReviews(req, res).catch(next);
});

export default router;
