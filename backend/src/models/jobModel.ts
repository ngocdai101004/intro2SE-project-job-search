import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Company", // Assuming this references a Company model
        },

        status: {
            type: String,
            required: true,
            enum: ["open", "closed", "draft"],
        },

        title: {
            type: String,
            required: true,
        },

        number_of_peoples: {
            type: Number,
            required: true,
        },

        type: {
            type: String,
            required: true,
            enum: ["full-time", "part-time", "contract", "internship"], // Example job types
        },

        location_type: {
            type: String,
            required: true,
            enum: ["remote", "on-site", "hybrid"], // Example location types
        },

        description: {
            type: String,
            required: true,
        },

        salary: {
            type: Number,
            required: true,
        },

        emails: {
            type: String,
        },

        requirements: {
            type: [String], // Array of strings
        },

        deadline: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the model
const JobDB = mongoose.model("Job", jobSchema);

export default JobDB;
