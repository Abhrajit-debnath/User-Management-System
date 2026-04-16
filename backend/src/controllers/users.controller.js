const sendResponse = require("../utils/response.utils");
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserProfile,
  updateUserProfile,
} = require("../services/user.service.js");

const createUserController = async (req, res) => {
  try {
    const { name, email, role, status, password } = req.body;
    const {userId} = req.user
    const user = await createUser(userId,name, email, role, status, password);
    sendResponse(res, "User created successfully", 201, user);
  } catch (error) {
    sendResponse(res, error.message, error.statusCode || 500);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const data = await getUsers(req.query);
    sendResponse(res, "Users fetched successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getUser(id);
    sendResponse(res, "User fetched successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

const updateUserByIdController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const data = await updateUser(id, userId, req.body);
    sendResponse(res, "User updated successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

const deleteUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteUser(id);
    sendResponse(res, "User deleted successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

const getProfileController = async (req, res) => {
  const { userId } = req.user;

  try {
    const data = await getUserProfile(userId);
    sendResponse(res, "User profile fetched successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

const updateProfileController = async (req, res) => {
  const { userId } = req.user;

  try {
    const data = await updateUserProfile(userId, req.body);
    sendResponse(res, "User profile updated successfully", 200, data);
  } catch (error) {
    sendResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllUsersController,
  createUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  getProfileController,
  updateProfileController,
};
