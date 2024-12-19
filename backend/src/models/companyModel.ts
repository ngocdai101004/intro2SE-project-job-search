import mongoose from "mongoose";

const companyInfoSchema = new mongoose.Schema(
    {
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", // Assuming this references a User model
        },

        admin_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Assuming this references a User model
            },
        ],

        company_name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        short_description: {
            type: String,
            required: true,
        },

        number_of_employees: {
            type: Number,
            required: true,
        },

        number_of_followers: {
            type: Number,
            default: 0, // Optional default value
        },

        legal_document_url: {
            type: String,
            required: true,
        },

        reviews: [
            {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User", // Assuming this references a User model
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5, // Ensures rating is between 1 and 5
                },
                review: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the model
const CompanyInfo = mongoose.model("CompanyInfo", companyInfoSchema);

export default CompanyInfo;
