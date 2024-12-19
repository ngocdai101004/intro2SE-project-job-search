import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
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

        address: {
            district: {
                type: String,
            },
            city_state: {
                type: String,
            },
            zip_code: {
                type: String,
            },
            country: {
                type: String,
            }
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

        legal_document_url: String,

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
                    enum: [1, 2, 3, 4, 5],
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
const CompanyDB = mongoose.model("CompanyInfo", companySchema);

export default CompanyDB;
