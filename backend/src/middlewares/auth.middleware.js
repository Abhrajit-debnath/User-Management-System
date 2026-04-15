
const sendResponse = require("../utils/response.utils");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendResponse(res, "Unauthorized User", 401);
  }
  try {
    const decodedToken = decodeToken(token);

    req.user = {
      userId: decodedToken.id,
      role: decodedToken.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return sendResponse(res, "Token expired, please login again", 401);
    }
    return sendResponse(res, "Unauthorized - Invalid token", 401);
  }
};

module.exports = authMiddleware;
