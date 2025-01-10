import dotenv from "dotenv";
import { users } from "./data/users";
import User from "./models/userModel";
import { chats } from "./data/chat";
import Chat from "./models/chatModel";
import { applications } from "./data/application";
import Application from "./models/applicationModel";
import { jobs } from "./data/jobs";
import Job from "./models/jobModel";
import { companies } from "./data/companies";
import Company from "./models/companyModel";
import { userInfo } from "./data/userInfo";
import UserInfo from "./models/userInfoModel";
import { getEmbedding } from "./utils/plot-embedding";
import mongoose from "mongoose";

import connectDB from "./configs/db";
import { Decimal128 } from "bson";
dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    await Chat.deleteMany();
    await Chat.insertMany(chats);
    await Application.deleteMany();
    await Application.insertMany(applications);
    await Job.deleteMany();
    await Job.insertMany(jobs);
    for (const jobData of jobs) {
      const embeddingArray = await getEmbedding(
        jobData.title + (jobData.description || "")
      );
      const decimalEmbeddingArray = embeddingArray.map((value) =>
        Decimal128.fromString(value.toString())
      );

      jobData.plot_embedding = decimalEmbeddingArray;
      console.log(jobData.plot_embedding);
    }
    await Company.deleteMany();
    await Company.insertMany(companies);
    await UserInfo.deleteMany();
    await UserInfo.insertMany(userInfo);

    console.log("Data Imported!");
    const jobSample = await Job.find();
    console.log("Jobs:", jobSample[0]);
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
