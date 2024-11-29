import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/user.mjs";
import JobSeeker from "./models/job_seeker.mjs";
import Company from "./models/company.mjs";
import Job from "./models/job.mjs";
import Application from "./models/application.mjs";
import Message from "./models/message.mjs";
import Follower from "./models/follower.mjs";
import follower from "./models/follower.mjs";
import dotenv from "dotenv";
dotenv.config();
DB_URI = process.env.DB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
const generateMockData = async () => {
  try {
    // Xóa dữ liệu cũ
    await Promise.all([
      JobSeeker.deleteMany({}),
      Job.deleteMany({}),
      Application.deleteMany({}),
      Message.deleteMany({}),
      Follower.deleteMany({}),
    ]);

    // Tạo dữ liệu Company
    const industries = [
      "Tech",
      "Finance",
      "Healthcare",
      "Education",
      "Retail",
      "Manufacturing",
    ];
    const companies = [];
    const recruiterUser = await User.findOne({});

    const jobTypes = ["fullTime", "partTime", "contract", "internship"];
    const jobs = [];
    const savedCompanies = await Company.find({});
    savedCompanies.forEach((company, index) => {
      for (let j = 0; j < 55; j++) {
        jobs.push({
          companyId: company._id,
          jobTitle: `Job Title ${index}-${j}`,
          demand: Math.floor(Math.random() * 10) + 1,
          location: {
            city: "City",
            country: "Country",
            isRemote: Math.random() > 0.5,
          },
          jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
          salary: {
            min: Math.floor(Math.random() * 50000) + 30000,
            max: Math.floor(Math.random() * 100000) + 60000,
            rate: "yearly",
          },
          jobDescription: "This is a job description.",
          requirements: ["Requirement 1", "Requirement 2", "Requirement 3"],
          benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
          customQuestions: [
            "Why are you interested in this job?",
            "What is your expected salary?",
          ],
          deadline: new Date(
            Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
          ),
          status: "active",
          numApplicants: Math.floor(Math.random() * 50),
          numAwaiting: Math.floor(Math.random() * 20),
        });
      }
    });

    await Job.insertMany(jobs);

    console.log("Data generated successfully!");
  } catch (error) {
    console.error("Error generating data:", error.message);
    console.error("Stack trace:", error.stack);
  } finally {
    await mongoose.disconnect();
  }
};

// Kết nối DB và sinh dữ liệu
await connectDB();
await generateMockData();

// Kết nối DB và sinh dữ liệu
await connectDB();
await generateMockData();
