const permissions = require("../config/permissions");
const sendResponse = require("../utils/response.utils");

const roleMiddleware = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendResponse(res, "User not authenticated", 401);
    }

    const userRole = req.user.role;
    const rolePermissions = permissions[userRole];

    if (!rolePermissions) {
      return sendResponse(res, "Invalid role", 403);
    }

    const hasPermissions = requiredPermissions.every((permission) =>
      rolePermissions.includes(permission),
    );

    if (!hasPermissions) {
      return sendResponse(res, "Access denied", 403);
    }

    next();
  };
};

module.exports = roleMiddleware;
