import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      min: '1987-09-28',
      max: new Date().now,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatarUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
