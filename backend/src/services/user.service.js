const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generatePassword = require("../utils/generatePassword.util");

const createUser = async (name, email, role, status, password) => {

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
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

module.exports = { createUser };