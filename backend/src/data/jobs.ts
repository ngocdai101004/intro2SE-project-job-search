import { ObjectId } from "mongodb";
import { companies } from "./companies";

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
    emails: "hr@company1.com",
    requirements: ["JavaScript", "Node.js", "React"],
    deadline: new Date("2024-12-31"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Frontend Developer",
    number_of_peoples: 3,
    type: "full-time",
    location_type: "on-site",
    description: "Create and optimize user interfaces.",
    salary: 1800,
    emails: "hr@company1.com",
    requirements: ["HTML", "CSS", "JavaScript"],
    deadline: new Date("2024-11-30"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Backend Developer",
    number_of_peoples: 4,
    type: "full-time",
    location_type: "remote",
    description: "Develop server-side logic and APIs.",
    salary: 2200,
    emails: "hr@company1.com",
    requirements: ["Node.js", "Express", "MongoDB"],
    deadline: new Date("2024-10-31"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "Data Scientist",
    number_of_peoples: 2,
    type: "full-time",
    location_type: "on-site",
    description: "Analyze and interpret complex data.",
    salary: 2500,
    emails: "hr@company3.com",
    requirements: ["Python", "Machine Learning", "Statistics"],
    deadline: new Date("2024-09-30"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "DevOps Engineer",
    number_of_peoples: 3,
    type: "full-time",
    location_type: "remote",
    description: "Manage and automate infrastructure.",
    salary: 2300,
    emails: "hr@company3.com",
    requirements: ["AWS", "Docker", "Kubernetes"],
    deadline: new Date("2024-08-31"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "Product Manager",
    number_of_peoples: 1,
    type: "full-time",
    location_type: "on-site",
    description: "Oversee product development lifecycle.",
    salary: 2700,
    emails: "hr@company3.com",
    requirements: ["Agile", "Scrum", "Leadership"],
    deadline: new Date("2024-07-31"),
  },

  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "AI Research Scientist",
    number_of_peoples: 2,
    type: "full-time",
    location_type: "remote",
    description:
      "Conduct research in artificial intelligence and machine learning.",
    salary: 3000,
    emails: "hr@company1.com",
    requirements: ["Python", "TensorFlow", "Deep Learning"],
    deadline: new Date("2024-06-30"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Machine Learning Engineer",
    number_of_peoples: 3,
    type: "full-time",
    location_type: "on-site",
    description: "Develop and deploy machine learning models.",
    salary: 2800,
    emails: "hr@company1.com",
    requirements: ["Python", "Scikit-learn", "Data Science"],
    deadline: new Date("2024-05-31"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Data Engineer",
    number_of_peoples: 4,
    type: "full-time",
    location_type: "remote",
    description: "Build and maintain data pipelines.",
    salary: 2600,
    emails: "hr@company1.com",
    requirements: ["Python", "SQL", "ETL"],
    deadline: new Date("2024-04-30"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "AI Product Manager",
    number_of_peoples: 1,
    type: "full-time",
    location_type: "on-site",
    description: "Manage AI product development and strategy.",
    salary: 3200,
    emails: "hr@company1.com",
    requirements: ["AI", "Product Management", "Leadership"],
    deadline: new Date("2024-03-31"),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Data Analyst",
    number_of_peoples: 2,
    type: "full-time",
    location_type: "remote",
    description: "Analyze and interpret data to provide insights.",
    salary: 2400,
    emails: "hr@company1.com",
    requirements: ["SQL", "Excel", "Data Visualization"],
    deadline: new Date("2024-02-29"),
  },
];
