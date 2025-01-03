import { Request, Response } from "express";
import JobDB from "../models/jobModel";
import ApplicationDB from "../models/applicationModel";
import UserDB from "../models/userModel";

export const getApplicantInfos = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;

    // Lấy danh sách công việc thuộc công ty
    const jobs = await JobDB.find({ company_id: companyId });

    // Tạo mapping cho công việc
    const jobMap = jobs.reduce((acc, job) => {
      acc[job._id.toString()] = job.title;
      return acc;
    }, {} as Record<string, string>);

    // Lấy danh sách ứng tuyển
    const applications = await ApplicationDB.find({
      job_id: { $in: jobs.map((job) => job._id) },
    }).sort({ createdAt: -1 });

    // Lấy thông tin người dùng
    const userIds = applications.map((app) => app.user_id);
    const users = await UserDB.find({ _id: { $in: userIds } });

    // Tạo mapping cho người dùng
    const userMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = {
        name: `${user.first_name} ${user.last_name}`,
      };
      return acc;
    }, {} as Record<string, { name: string }>);

    // Mapping dữ liệu hoàn chỉnh
    const result = applications.map((app) => ({
      id: app._id, // Lấy ID của applicant
      candidateName: userMap[app.user_id.toString()]?.name || "Unknown",
      jobTitle: jobMap[app.job_id.toString()] || "Unknown Job",
      feedback: app.feedback || "No feedback",
      appliedDate: app.createdAt.toISOString().split("T")[0], // Format ngày
      status: app.status,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
