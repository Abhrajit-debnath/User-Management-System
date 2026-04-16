const { loginUser } = require("../services/auth.service");
const sendResponse = require("../utils/response.utils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const data = await loginUser(email, password);

    console.log(data);

    if (data.user) {
      sendResponse(res, "User loggedIn successfully", 201, data);
    }
  } catch (error) {
    const status =
      error.message === "Invalid credentials"
        ? 401
        : error.message === "Account is deactivated"
          ? 403
          : 500;

    sendResponse(res, error.message, status);
  }
};

module.exports = login;
