import mongoose from "mongoose";
import { companies } from "../data/companies";

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

    // Header
    company_name: {
      type: String,
      required: true,
    },

    sumRating: {
      type: Number,
      default: 0,
    },

    applicant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Snapshot
    address: {
      district: {
        type: String,
        default: "",
      },
      city_state: {
        type: String,
        default: "",
      },
      zip_code: {
        type: String,
        default: "",
      },
      country: {
        type: String,
      },
    },

    description: {
      company_size: {
        type: [Number],
        required: true,
      },
      industry: {
        type: String,
        required: true,
      },
      headquarters: {
        type: String,
        required: true,
      },
      links: {
        type: [String],
      },
      founded: {
        type: Date,
        required: true,
      },
      specialities: {
        type: [String],
      },
    },

    short_description: {
      type: String,
      required: true,
    },

    legal_document_url: String,

    // Reviews
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
        date: {
          type: Date,
          default: Date.now,
        },
        review: {
          type: String,
        },
      },
    ],

    // Reviews
    qa: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model
const CompanyDB = mongoose.model("Company", companySchema);

export default CompanyDB;
