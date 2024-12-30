import { NextFunction, Response } from "express";
import Company from "../models/companyModel";
import { IVerifyAdminRequest } from "../interfaces/interfaces";

export const verifyAdmin = async (
  req: IVerifyAdminRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.body.userID;
    const companyID = req.body.company_id;
    if (!userID) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!companyID) {
      res.status(400).json({ message: "Company ID not found" });
      return;
    }

    // Check if the user is an admin of the company
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found" });
      return;
    }

    const admin =
      company.owner_id || company.admin_id.find((id) => String(id) === userID);

    if (!admin) {
      res.status(403).json({ message: "You are not an admin of this company" });
      return;
    } else {
      req.body.isAdmin = true;
      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
