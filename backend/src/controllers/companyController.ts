import { Request, Response } from "express";
import Company from "../models/companyModel";
import mongoose from "mongoose";

// Create a new company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { userID, ...companyData } = req.body;
    const company = await Company.create({ ...companyData, owner_id: userID });
    res.status(201).json({
      message: "Company created successfully",
      data: { company },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Get all companies
export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      message: "Companies retrieved successfully",
      data: companies,
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Update a company
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID, ...updateData } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({
        message: "Company not found",
        data: {},
      });
      return;
    }
    if (company.owner_id.toString() !== userID) {
      res.status(403).json({
        message: "You are not authorized to update this company",
        data: {},
      });
      return;
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json({
      message: "Company updated successfully",
      data: { company },
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      data: {},
    });
    return;
  }
};
// Get a company
export const getCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params as { companyID: string };
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    res.status(200).json({
      message: "Company retrieved successfully",
      data: { company },
    });
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      data: {},
    });
  }
};

// Delete a company
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    if (company.owner_id.toString() !== userID) {
      res.status(403).json({
        message: "You are not authorized to delete this company",
        data: {},
      });
      return;
    }
    await Company.findByIdAndDelete(companyID);
    res.status(200).json({ message: "Company deleted successfully", data: {} });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Follow a company
export const isFollowed = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    if (company.admin_id.includes(userID)) {
      res
        .status(200)
        .json({ message: "You are an admin of this company", data: {} });
      return;
    }
    if (company.owner_id.toString() === userID) {
      res
        .status(200)
        .json({ message: "You are the owner of this company", data: {} });
      return;
    }

    if (company.followers.includes(userID)) {
      res.status(200).json({
        message: "Unfollow this company successfully",
        data: { isFollowed: true },
      });
      return;
    }
    res.status(200).json({
      message: "Follow this company successfully",
      data: { isFollowed: false },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Follow a company
export const followCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    if (company.admin_id.includes(userID)) {
      res
        .status(403)
        .json({ message: "You are an admin of this company", data: {} });
      return;
    }
    if (company.followers.includes(userID)) {
      res.status(408).json({ message: "Request Timeout!", data: {} });
      return;
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $push: { followers: userID } },
      { new: true }
    );
    res.status(200).json({
      message: "You are now following this company",
      data: { company },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Unfollow a company
export const unfollowCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    if (company.admin_id.includes(userID)) {
      res
        .status(403)
        .json({ message: "You are an admin of this company", data: {} });
      return;
    }
    if (!company.followers.includes(userID)) {
      res.status(408).json({ message: "Request Timeout!", data: {} });
      return;
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $pull: { followers: userID } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "You have unfollowed this company", data: {} });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Review a company
export const reviewCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID, isVerified, ...review } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    if (!isVerified) {
      res.status(403).json({ message: "Please verify your account", data: {} });
      return;
    }

    if (review.rating < 1 || review.rating > 5) {
      res.status(400).json({
        message: "Please rate between 1 and 5",
        data: {},
      });
      return;
    }

    review.user_id = userID;
    if (company.reviews.some((r) => r.user_id.toString() === userID)) {
      // Update review
      await Company.updateOne(
        { _id: companyID, "reviews.user_id": userID },
        { $set: { "reviews.$": review } }
      );
    } else {
      // Create review
      await Company.findByIdAndUpdate(
        companyID,
        { $push: { reviews: review } },
        { new: true }
      );
    }
    res
      .status(200)
      .json({ message: "Review submitted successfully", data: review });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Delete a company review
export const deleteCompanyReview = async (req: Request, res: Response) => {
  try {
    const { companyID, reviewID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    if (!company.reviews.some((r) => r.user_id.toString() === userID)) {
      res
        .status(403)
        .json({ message: "You have not reviewed this company", data: {} });
      return;
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $pull: { reviews: { _id: reviewID } } },
      { new: true }
    );
    res.status(200).json({
      message: "Review deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Check if user has reviewed a company
export const isReviewed = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    const isReviewed = company.reviews.some(
      (r) => r.user_id.toString() === userID
    );
    res
      .status(200)
      .json({ message: "Review status retrieved", data: { isReviewed } });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Get all company reviews
export const getCompanyReviews = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    res.status(200).json({
      message: "Reviews retrieved successfully",
      data: { reviews: company.reviews },
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Get all companies by owner/admin
export const getAllCompaniesByOwnerAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { userID } = req.params; // Lấy userID từ params
    const { page = 1, limit = 10 } = req.query;

    if (!userID) {
      res.status(400).json({ message: "Missing userID", data: [] });
      return;
    }

    // Chuyển userID thành ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userID);

    // Xử lý phân trang
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Lấy tổng số công ty
    const totalCompanies = await Company.countDocuments({
      $or: [{ owner_id: userObjectId }, { admin_id: userObjectId }],
    });

    // Lấy danh sách công ty với phân trang
    const companies = await Company.aggregate([
      {
        $match: {
          $or: [{ owner_id: userObjectId }, { admin_id: userObjectId }],
        },
      },
      { $sort: { createdAt: -1 } }, // Sắp xếp theo ngày tạo mới nhất
      { $skip: skip }, // Bỏ qua số lượng bản ghi
      { $limit: pageSize }, // Lấy số lượng bản ghi theo pageSize
      {
        $addFields: {
          role: {
            $cond: {
              if: { $eq: ["$owner_id", userObjectId] },
              then: "Owner",
              else: "Admin",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          company_name: 1,
          role: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          }, // Định dạng ngày
          address: "$address.city_state",
        },
      },
    ]);

    // Trả về dữ liệu
    res.status(200).json({
      message: "Companies retrieved successfully.",
      data: {
        companies,
        totalCompanies,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCompanies / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error", data: [] });
  }
};

export default {
  createCompany,
  getAllCompanies,
  updateCompany,
  getCompany,
  deleteCompany,
  followCompany,
  unfollowCompany,
  reviewCompany,
  deleteCompanyReview,
  getCompanyReviews,
};
