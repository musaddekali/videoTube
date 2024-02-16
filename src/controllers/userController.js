const registerUser = (req, res) => {
  console.log("🚀 ~ registerUser ~ req:", req.body)
  res.json({ message: "User registered successfully", status: "success" });
};

export { registerUser };
