import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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
    refreshToken: {
      type: String
    }
  },
  { timeseries: true }
);

// make hash password with middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);
