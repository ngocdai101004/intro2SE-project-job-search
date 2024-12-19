import {ObjectId} from "mongodb";
import {companies} from "./companies";

export const jobs = [
    {
        _id: new ObjectId(),
        company_id: companies[0]._id,
        status: "open",
        title: "Software Engineer",
        number_of_peoples: 5,
        type: "full-time",
        location_type: "remote",
        description: "Develop and maintain web applications.",
        salary: 2000,
        requirements: ["JavaScript", "Node.js", "React"],
        deadline: new Date("2024-12-31")
    }
];
