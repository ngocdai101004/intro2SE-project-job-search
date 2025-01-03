import e from "express";
import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    review: [
      {
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          enum: [1, 2, 3, 4, 5],
        },
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    ],

    education: [
      {
        education_level: {
          type: String,
          required: true,
        },
        study_field: {
          type: String,
          required: true,
        },
        school_name: {
          type: String,
          required: true,
        },
        begin: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
        },
        additional_details: {
          type: String,
        },
      },
    ],

    experience: [
      {
        job_title: {
          type: String,
          required: true,
        },
        company_name: {
          type: String,
          required: true,
        },
        begin: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],

    skills: {
      type: [String],
      default: [],
    },

    certifications: [
      {
        name: {
          type: String,
          required: true,
        },
        issuing_organization: {
          type: String,
          required: true,
        },
        issue_date: {
          type: Date,
          required: true,
        },
      },
    ],

    job_preferences: [
      {
        job_title: {
          type: String,
          required: true,
        },
        industry: {
          type: String,
          required: true,
        },
        relocate_preference: {
          type: String,
          enum: ["willing", "not_willing", "remote_only", "flexible"],
        },
        salary_expectation: {
          type: Number,
        },
      },
    ],

    ready_to_work: {
      type: Boolean,
      default: false,
      required: true,
    },

    additional_info: {
      type: String,
      default: "",
    },

    awards: {
      type: [String],
      default: [],
    },

    languages: {
      type: [String],
      default: [],
    },

    link: {
      type: [String],
      default: [],
    },

    publications: [
      {
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],

    qualifications: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],

    resume: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
const UserInfoDB = mongoose.model("UserInfo", userInfoSchema);

export default UserInfoDB;
