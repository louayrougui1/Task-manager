const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields (name,email,password)");
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL: "",
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: "",
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error("please add all fields (password,email)");
  }
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid email/password");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: email });
  console.log(user);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    createdAt: user.createdAt,
    token: generateToken(user._id),
  });
  res.status(200).json(req.user);
});

const editProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  if (req.file) {
    user.avatarURL = `/uploads/${req.file.filename}`;
  }
  const updatedFields = {
    name: name,
    avatarURL: user.avatarURL,
  };
  user.name = name || user.name;
  user.token = generateToken(user.id);
  await User.findByIdAndUpdate(user._id, updatedFields);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    createdAt: user.createdAt,
    token: generateToken(user._id),
  });
});

//generate jwt

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe, editProfile };
