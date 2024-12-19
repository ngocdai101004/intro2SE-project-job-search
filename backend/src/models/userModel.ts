import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define an interfaces for the User document
interface IUserMongoose extends mongoose.Document {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  is_verified: boolean;
  verification_code: string;
  address: string;
  city_state: string;
  zip_code: string;
  country: string;
  gender: string;
  date_of_birth: Date;

  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserMongoose>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUserMongoose>("User", userSchema);

export default User;
