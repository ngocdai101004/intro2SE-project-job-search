import mongoose, { InferSchemaType, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    verification_code: {
      type: String,
    },
    phone: {
      type: String,
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
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    date_of_birth: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Add the matchPassword method
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash passwords
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Infer the type from the schema
type UserDocument = InferSchemaType<typeof userSchema> & {
  matchPassword(enteredPassword: string): Promise<boolean>;
};

// Create the User model
const UserDB = mongoose.model<UserDocument>("User", userSchema);

export default UserDB;
