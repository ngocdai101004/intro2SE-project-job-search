import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import {
  getUser,
  updateUser,
  deleteUser,
  createUserInfo,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  updateShortBio,
  updateProfilePicture,
  updateSummary,
  updateReadyToWork,
  addReview,
  editReview,
  deleteReview,
  addEducation,
  editEducation,
  deleteEducation,
  addExperience,
  editExperience,
  deleteExperience,
  addSkill,
  deleteSkill,
  addCertification,
  deleteCertification,
  addJobPreference,
  editJobPreference,
  deleteJobPreference,
  addAward,
  deleteAward,
  addLanguage,
  deleteLanguage,
  addLink,
  deleteLink,
  addPublication,
  deletePublication,
  addQualification,
  deleteQualification,
} from "../controllers/userController";

const router = Router();

router.get("/profile", verifyUser, getUser);
router.patch("/profile", verifyUser, updateUser);
router.delete("/profile", verifyUser, deleteUser);

router.post("/profile/info", verifyUser, createUserInfo);
router.get("/profile/info", verifyUser, getUserInfo);
router.put("/profile/info", verifyUser, updateUserInfo);
router.delete("/profile/info", verifyUser, deleteUserInfo);

router.put("/profile/info/short_bio", verifyUser, updateShortBio);
router.put("/profile/info/profile_picture", verifyUser, updateProfilePicture);
router.put("/profile/info/summary", verifyUser, updateSummary);
router.put("/profile/info/ready_to_work", verifyUser, updateReadyToWork);

router.post("/profile/info/review", verifyUser, addReview);
router.put("/profile/info/review", verifyUser, editReview);
router.delete("/profile/info/review", verifyUser, deleteReview);

router.post("/profile/info/education", verifyUser, addEducation);
router.put("/profile/info/education", verifyUser, editEducation);
router.delete("/profile/info/education", verifyUser, deleteEducation);

router.post("/profile/info/experience", verifyUser, addExperience);
router.put("/profile/info/experience", verifyUser, editExperience);
router.delete("/profile/info/experience", verifyUser, deleteExperience);

router.post("/profile/info/skill", verifyUser, addSkill);
router.delete("/profile/info/skill", verifyUser, deleteSkill);

router.post("/profile/info/certification", verifyUser, addCertification);
router.delete("/profile/info/certification", verifyUser, deleteCertification);

router.post("/profile/info/job_preference", verifyUser, addJobPreference);
router.put("/profile/info/job_preference", verifyUser, editJobPreference);
router.delete("/profile/info/job_preference", verifyUser, deleteJobPreference);

router.post("/profile/info/award", verifyUser, addAward);
router.delete("/profile/info/award", verifyUser, deleteAward);

router.post("/profile/info/language", verifyUser, addLanguage);
router.delete("/profile/info/language", verifyUser, deleteLanguage);

router.post("/profile/info/link", verifyUser, addLink);
router.delete("/profile/info/link", verifyUser, deleteLink);

router.post("/profile/info/publication", verifyUser, addPublication);
router.delete("/profile/info/publication", verifyUser, deletePublication);

router.post("/profile/info/qualification", verifyUser, addQualification);
router.delete("/profile/info/qualification", verifyUser, deleteQualification);

export default router;
