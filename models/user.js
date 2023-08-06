import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
      unique: true,
    },
    address: {
      type: "string",
      required: true,
    },
    passwordHash: {
      type: "string",
      required: true,
    },
    avatarUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);