import User from "../models/UserModel.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helpers/jwt.helper.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password, phoneNumber, address } = req.body;

  const existingUser = await User.findOne({ email });
  if (email === existingUser) {
    return next(
      new AppError("User with the email already exists, try logging in", 401)
    );
  }
  try {

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
      phoneNumber,
      address,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      status: "Success",
      data: user,
      token,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error signing up", 404));
  }
};

export const loginUser = async (req, res, next) => {
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("No user found with that email. Try signing Up.", 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AppError("Invalid password", 401));
    }

    const token = generateToken(user._id);

    res.status(200).json({
      status: "successfully got the user details",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error getting the user details", 404));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "successfully updated the user details",
      data: {
        data: user,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error editing the user", 404));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      status: "successfully deleted the user",
      data: null,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Some error occured", 404));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({});

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch user",
    });
  }
};
