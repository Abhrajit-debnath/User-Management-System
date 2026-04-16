const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generatePassword = require("../utils/generatePassword.util");

const createUser = async (userId, name, email, role, status, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const rawPassword = password || generatePassword();
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const user = await User.create({
    name,
    email,
    role,
    status,
    password: hashedPassword,
    createdBy: userId,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

const getUsers = async (query) => {
  const { page = 1, limit = 10, role = "", status = "" } = query;
  const filter = {};

  if (role) {
    filter.role = role;
  }
  if (status) {
    filter.status = status;
  }

  const skippedDataCount = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .skip(Number(skippedDataCount))
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  return {
    users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUser = async (id) => {
  const user = await User.findById(id).select("-password");
  return {
    user,
  };
};

const updateUser = async (id, userId, updatedData) => {
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...updatedData, updatedBy: userId },
    {
      returnDocument: "after",
    },
  ).select("-password");
  return {
    user,
  };
};

const deleteUser = async (id) => {
  const user = await User.findOneAndDelete({ _id: id }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return { _id: user._id };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return { user };
};

const updateUserProfile = async (userId, updatedData) => {
  console.log(updatedData);

  const user = await User.findOneAndUpdate({ _id: userId }, updatedData, {
    returnDocument: "after",
  }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return { user };
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
};
