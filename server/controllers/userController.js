import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User Already Exist", 409));
  }

  user = await User.create({ email, password });

  const token = user.getJWTToken(); // Generate JWT token

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user,
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(new ErrorHandler("Error logging out user"));
  }
});

export const loadUser = catchAsyncError(async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.json({ success: true, username: user.email, userId: user._id, user });
    } else {
      res.status(400).json({ success: false, message: "User does not exist" });
    }
  } catch (error) {
    next(new ErrorHandler("Error getting user"));
  }
});
