import {users} from "./users";

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

export const userInfo = [
    {
        user_id: users[0]._id, // User's unique ObjectId
        review: [
            {
                reviewer: new ObjectId(), // ObjectId of the reviewer
                content: "Great user!",
                rating: 5
            }
        ],
        education: [
            {
                education_level: "Bachelor's",
                study_field: "Computer Science",
                school_name: "University of Example",
                begin: new Date("2015-09-01T00:00:00.000Z"),
                end: new Date("2019-05-31T00:00:00.000Z"),
                additional_details: "Graduated with honors"
            }
        ],
        experience: [
            {
                job_title: "Software Engineer",
                company_name: "TechCorp",
                begin: new Date("2020-01-01T00:00:00.000Z"),
                end: new Date("2023-01-01T00:00:00.000Z"),
                description: "Developed web applications"
            }
        ],
        skills: ["JavaScript", "Node.js", "React"],
        certifications: ["AWS Certified Developer"],
        job_preferences: [
            {
                job_title: "Senior Developer",
                industry: "Tech",
                relocate_preference: "Yes",
                salary_expectation: 90000
            }
        ],
        ready_to_work: true,
        additional_info: "Looking for remote opportunities",
        awards: ["Employee of the Month"],
        languages: ["English", "French"],
        link: ["https://github.com/example"],
        publications: [
            {
                title: "Building Scalable Web Apps",
                url: "https://example.com",
                description: "An article on scaling applications"
            }
        ]
    }
];
