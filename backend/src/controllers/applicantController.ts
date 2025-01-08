import { Request, Response } from "express";
import JobDB from "../models/jobModel";
import ApplicationDB from "../models/applicationModel";
import UserDB from "../models/userModel";

// Lấy thông tin ứng viên với phân trang
export const getApplicantInfos = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;

    // Lấy tham số phân trang từ query (page và limit)
    const page = parseInt(req.query.page as string) || 1; // Mặc định trang 1
    const limit = parseInt(req.query.limit as string) || 5; // Mặc định 5 ứng viên mỗi trang
    const skip = (page - 1) * limit; // Tính toán số lượng bỏ qua

    // Lấy danh sách công việc thuộc công ty
    const jobs = await JobDB.find({ company_id: companyId });

    // Tạo mapping cho công việc
    const jobMap = jobs.reduce((acc, job) => {
      acc[job._id.toString()] = job.title;
      return acc;
    }, {} as Record<string, string>);

    // Lấy danh sách ứng tuyển có phân trang
    const applications = await ApplicationDB.find({
      job_id: { $in: jobs.map((job) => job._id) },
    })
      .sort({ createdAt: -1 }) // Sắp xếp theo ngày ứng tuyển mới nhất
      .skip(skip)
      .limit(limit);

    // Lấy tổng số lượng ứng viên
    const totalApplicants = await ApplicationDB.countDocuments({
      job_id: { $in: jobs.map((job) => job._id) },
    });

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

    // Trả về kết quả kèm phân trang
    res.status(200).json({
      candidates: result,
      totalCandidates: totalApplicants,
      currentPage: page,
      totalPages: Math.ceil(totalApplicants / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Cập nhật feedback cho ứng viên
export const updateApplicantFeedback = async (req: Request, res: Response) => {
  try {
    const { applicantId } = req.params; // Lấy ID ứng viên từ URL
    const { feedback } = req.body; // Lấy feedback từ body

    // Kiểm tra nếu feedback trống
    if (!feedback) {
      res.status(400).json({ message: "Feedback cannot be empty." });
    }

    // Tìm và cập nhật feedback trong database
    const updatedApplication = await ApplicationDB.findByIdAndUpdate(
      applicantId,
      { feedback }, // Cập nhật feedback
      { new: true } // Trả về dữ liệu mới sau khi cập nhật
    );

    // Kiểm tra ứng viên có tồn tại không
    if (!updatedApplication) {
      res.status(404).json({ message: "Applicant not found." });
    }

    // Trả về kết quả thành công
    res.status(200).json({
      message: "Feedback updated successfully.",
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update feedback.",
      error: (error as any).message,
    });
  }
};
