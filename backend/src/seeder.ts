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

import connectDB from "./configs/db";

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
    await Company.deleteMany();
    await Company.insertMany(companies);
    await UserInfo.deleteMany();
    await UserInfo.insertMany(userInfo);

    console.log("Data Imported!");
    process.exit();
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
