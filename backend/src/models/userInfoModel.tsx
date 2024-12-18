import mongoose from 'mongoose';

// Define an interface for the UserInfo document
interface IUserInfo extends mongoose.Document {
    user_id: mongoose.Schema.Types.ObjectId;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    date_of_birth: Date;
    gender: string;
    education: string;
    experience: number;
    skills: string[];
    job_preferences: {
        job_type: string;
        industry: string;
        location_preference: string;
        salary_expectation: number;
    };
}

const userInfoSchema = new mongoose.Schema<IUserInfo>(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zip_code: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },
        education: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
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
            location_preference: {
                type: String,
                required: true,
            },
            salary_expectation: {
                type: Number,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const UserInfo = mongoose.model<IUserInfo>('UserInfo', userInfoSchema);

export default UserInfo;
