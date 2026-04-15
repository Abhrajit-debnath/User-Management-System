const User = require("../models/user.model");
const generateToken = require("../utils/generateToken.utils");
const bcrypt =  require("bcryptjs")

const loginUser = async (email, password) => {
  const user = await User.findOne({
    email,
  });

  if (!user) throw new Error("Invalid credentials");

  if (user.status !== "active") {
    throw new Error("Account is deactivated");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id,
      name:user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
};

module.exports = {loginUser};
