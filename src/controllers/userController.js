import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  // get user data from frontend
  // validtaion - not empty
  // check if user already exists : email
  // make user object and entry in db
  // check for user creation
  // return res

  try {
    const { name, email, password } = req.body;
    if ([name, email, password].some((field) => field.trim() === "")) {
      throw new Error("Name, Email and password is required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
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
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ success: false, message: error.message });
  }
};

export { registerUser };
