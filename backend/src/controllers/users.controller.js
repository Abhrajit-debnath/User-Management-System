const sendResponse = require("../utils/response.utils");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
} = require("../services/user.service.js");

const createUser = async (req, res) => {
  try {
    const { name, email, role, status, password } = req.body;
    const user = await createUser(name, email, role, status, password);
    sendResponse(res, "User created successfully", 201, user);
  } catch (error) {
    sendResponse(res, error.message, error.statusCode || 500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await getUsers(req.query);
    sendResponse(res, "Users fetched successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getUser(id);
    sendResponse(res, "User fetched successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await updateUser(id, req.body);
    sendResponse(res, "User updated successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

module.exports = { getAllUsers, createUser, getUserById, updateUserById };
