import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const unlinkAvatar = (req) => {
  const avatarLocalPath = req.file?.path;
  if (avatarLocalPath) fs.unlinkSync(avatarLocalPath);
};

const registerUser = asyncHandler(async (req, res) => {
  // get user data from frontend
  // validtaion - not empty
  // check if user already exists : email
  // make user object and entry in db
  // check for user creation
  // return res
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field.trim() === "")) {
    unlinkAvatar(req);
    throw new Error("All fields are required!");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    unlinkAvatar(req);
    throw new Error("User already exist.");
  }

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new Error("Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new Error("Avatar file is required");
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: avatar.url
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new Error("Some went wrong while registering the user");
  }

  res.status(200).json({
    success: true,
    message: "User registered Successfully!",
    data: createdUser
  });
});

export { registerUser };
