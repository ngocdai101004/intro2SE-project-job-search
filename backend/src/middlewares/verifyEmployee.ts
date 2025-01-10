import { Request, Response, NextFunction } from "express";
import Company from "../models/companyModel";

// Verify user is a employee, not an owner or admin
export const verifyEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyID } = req.params;
    const { userID } = req.body;
    const company = await Company.findById(companyID);
    if (!company) {
      res.status(404).json({ message: "Company not found", data: {} });
      return;
    }
    if (company.owner_id.toString() === userID) {
      res.status(403).json({
        message: "You are the owner of this company",
        data: {},
      });
      return;
    }
    if (company.admin_id.includes(userID)) {
      res.status(403).json({
        message: "You are an admin of this company",
        data: {},
      });
      return;
    }
    if (!company.employees.includes(userID)) {
      res.status(403).json({
        message: "You are not an employee of this company",
        data: {},
      });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ message: (error as any).message, data: {} });
  }
};
