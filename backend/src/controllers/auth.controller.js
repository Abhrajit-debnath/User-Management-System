const {loginUser} = require("../services/auth.service");
const sendResponse = require("../utils/response.utils");

const login = async (req, res) => {
  try {
    const { email, password } = await req.body;

    const data = await loginUser(email, password);

    if (data.user) {
      sendResponse(res, "User loggedIn successfully", 201,
        data
      );
    }
  } catch (error) {
    sendResponse(res, "Something went wrong", 500,error.message);
  }
};

module.exports = login;
