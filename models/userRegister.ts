import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the user schema
interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  occupation: string;
  organizationName: string;
  role: string;
  blood: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  location?: string;
  address?: string;
  preferredAreas: string;
  availability?: string;
}

// Define the schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    occupation: { type: String, required: true },
    organizationName: { type: String, required: true },
    role: {
      type: String,
      required: true,
    },
    blood: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
    },
    location: { type: String },
    address: { type: String },
    preferredAreas: { type: String, required: true },
    availability: {
      type: String,
      default: "Available",
    },
  },
  { timestamps: true }
);

// Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
