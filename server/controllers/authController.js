import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(401).json({
        success: false,
        message: "User is already existing",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something went wrong, Try again",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
    });
    res.json({
      success: "true",
      message: "User successfully logged in",
    });
  } catch (error) {}
};

export const checkAuth = (req, res) => {
  const user = req.user;
  if (!user)
    res.status(401).json({
      success: false,
      message: "User not logged in",
    });
  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
