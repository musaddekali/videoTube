import { User } from "../models/userModel.js";

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

    const user = await User.create({
      name,
      email,
      password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new Error("Some went wrong while registering the user");
    }

    res
      .status(200)
      .json({
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
