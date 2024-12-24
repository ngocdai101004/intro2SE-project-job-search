import { Request, Response } from "express";
import Company from "../models/companyModel";

// Create a new company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { userID, ...companyData } = req.body;
    const company = await Company.create({ ...companyData, owner_id: userID });
    res.status(201).json({
      message: "Company created successfully",
      data: company,
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
      return res.status(404).json({
        message: "Company not found",
        data: {},
      });
    }
    if (company.owner_id.toString() !== userID) {
      return res.status(403).json({
        message: "You are not authorized to update this company",
        data: {},
      });
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $set: updateData },
      { new: true }
    );
    return res.status(200).json({
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as any).message,
      data: {},
    });
  }
};

// Get a company
export const getCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const company = await Company.findById(companyID);
    if (!company) {
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    res.status(200).json({
      message: "Company retrieved successfully",
      data: company,
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
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    if (company.owner_id.toString() !== userID) {
      return res.status(403).json({
        message: "You are not authorized to delete this company",
        data: {},
      });
    }
    await Company.findByIdAndDelete(companyID);
    res.status(200).json({ message: "Company deleted successfully", data: {} });
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
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    if (company.admin_id.includes(userID)) {
      return res
        .status(403)
        .json({ message: "You are an admin of this company", data: {} });
    }
    if (company.followers.includes(userID)) {
      return res
        .status(403)
        .json({ message: "You are already following this company", data: {} });
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $push: { followers: userID } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "You are now following this company", data: company });
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
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    if (company.admin_id.includes(userID)) {
      return res
        .status(403)
        .json({ message: "You are an admin of this company", data: {} });
    }
    if (!company.followers.includes(userID)) {
      return res
        .status(403)
        .json({ message: "You are not following this company", data: {} });
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
    const { userID, rating, review } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    if (
      company.admin_id.includes(userID) ||
      company.owner_id.toString() === userID
    ) {
      return res
        .status(403)
        .json({ message: "You are an admin of this company", data: {} });
    }
    const reviewData = { user_id: userID, rating, review };
    await Company.findByIdAndUpdate(
      companyID,
      { $push: { reviews: reviewData } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Review added successfully", data: reviewData });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Update a company review
export const updateCompanyReview = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID, rating, review } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    if (
      company.admin_id.includes(userID) ||
      company.owner_id.toString() === userID
    ) {
      return res
        .status(403)
        .json({ message: "You are an admin of this company", data: {} });
    }
    const reviewData = { user_id: userID, rating, review };
    await Company.findOneAndUpdate(
      { _id: companyID, "reviews.user_id": userID },
      { $set: { "reviews.$": reviewData } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Review updated successfully", data: reviewData });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

// Delete a company review
export const deleteCompanyReview = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    if (
      company.admin_id.includes(userID) ||
      company.owner_id.toString() === userID
    ) {
      return res
        .status(403)
        .json({ message: "You are an admin of this company", data: {} });
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $pull: { reviews: { user_id: userID } } },
      { new: true }
    );
    res.status(200).json({ message: "Review deleted successfully", data: {} });
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
      return res.status(404).json({ message: "Company not found", data: {} });
    }
    res.status(200).json({
      message: "Reviews retrieved successfully",
      data: company.reviews,
    });
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};

export default {
  createCompany,
  updateCompany,
  getCompany,
  deleteCompany,
  followCompany,
  unfollowCompany,
  reviewCompany,
  updateCompanyReview,
  deleteCompanyReview,
  getCompanyReviews,
};
