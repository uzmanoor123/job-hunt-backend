const User =  require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name , Email, Password are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "user already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User registered successfully ",
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Email, Password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "user does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};
module.exports = {
   registerUser,
    loginUser 
  };