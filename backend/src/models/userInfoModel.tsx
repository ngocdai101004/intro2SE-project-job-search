import mongoose from 'mongoose';

const userInfoSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Assuming this references a User model
        },

        review: [
            {
                reviewer: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User', // Assuming reviewers are also users
                },
                content: {
                    type: String,
                    required: true,
                },
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
                month_begin: {
                    type: Number,
                    required: true,
                },
                year_begin: {
                    type: Number,
                    required: true,
                },
                month_end: {
                    type: Number,
                },
                year_end: {
                    type: Number,
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
                month_begin: {
                    type: Number,
                    required: true,
                },
                year_begin: {
                    type: Number,
                    required: true,
                },
                month_end: {
                    type: Number,
                },
                year_end: {
                    type: Number,
                },
                description: {
                    type: String,
                },
            },
        ],

        skills: {
            type: [String],
        },

        certifications: {
            type: [String], // Array of strings
        },

        job_preferences: {
            job_type: {
                type: String,
                required: true,
            },
            industry: {
                type: String,
                required: true,
            },
            relocate_preference: {
                type: String,
                required: true,
            },
            salary_expectation: {
                type: Number,
                required: true,
            },
        },

        ready_to_work: {
            type: Boolean,
            default: false,
        },

        // Additional information
        additional_info: {
            type: String,
        },

        awards: {
            type: [String], // Array of strings
        },

        languages: [
            {
                language: {
                    type: String,
                    required: true,
                },
                proficiency: {
                    type: String,
                    required: true,
                },
            },
        ],

        link: {
            type: String,
        },

        publications: [
            {
                title: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                },
                description: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Create the model
const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo;
