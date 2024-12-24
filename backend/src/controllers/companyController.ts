import { Request, Response } from "express";
import Company from "../models/companyModel";

// Create a new company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { userID, ...companyData } = req.body;
    const company = await Company.create({ ...companyData, owner_id: userID });
    res.status(201).json({ company });
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};

// Update a company
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { companyID } = req.params;
    const { userID, ...updateData } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (company.owner_id.toString() !== userID) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this company" });
    }
    await Company.findByIdAndUpdate(
      companyID,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json({ company });
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};
