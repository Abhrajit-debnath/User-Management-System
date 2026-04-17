const permissions = {
  admin: ["create", "delete", "list", "view", "update", "profile"],
  manager: ["list", "view", "update", "profile"],
  user: ["profile"],
};
module.exports = permissions;