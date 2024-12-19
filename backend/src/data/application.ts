import {ObjectId} from "mongodb";
import {jobs} from "./jobs";
import {users} from "./users";

export const applications = [
    {
        _id: new ObjectId(),
        job_id: jobs[0]._id,
        user_id: users[1]._id,
        resume_url: "https://example.com/resumes/resume1.pdf",
        status: "applied",
        feedback: "We will get back to you soon."
    }
];
