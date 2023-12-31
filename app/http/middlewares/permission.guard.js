const createHttpError = require("http-errors");
const { PERMISSIONS } = require("../../utils/constans.utils");
const permissionModel = require("../models/permission.model");
const roleModel = require("../models/roles.model");

function checkPermission(requiredPermissions = []) {
  return async function (req, res, next) {
    try {
      const allPermissions = requiredPermissions.flat(2);
      const user = req.user;
      const role = await roleModel.findOne({ title: user.Role });
      const permissions = await permissionModel.find({
        _id: { $in: role.permissions },
      });
      const userPermissions = permissions.map((item) => item.name);
      const hasPermission = allPermissions.every((permission) => {
        return userPermissions.includes(permission);
      });
      if (userPermissions.includes(PERMISSIONS.ALL)) return next();
      if (allPermissions.length == 0 || hasPermission) return next();
      throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید");
    } catch (err) {
      next(err);
    }
  };
}

module.exports = checkPermission;
