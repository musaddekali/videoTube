import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: [true, "Password is required!"]
    },
    avatar: {
      type: String,
      default: ""
    },
    coverImage: {
      type: String,
      default: ""
    },
    refreshToken: {
      type: String
    }
  },
  { timeseries: true }
);

export const User = mongoose.model("User", userSchema);
