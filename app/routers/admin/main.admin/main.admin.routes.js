const blogRoutes = require("../blog.routes");
const permissionRoutes = require("../permisson.routes");
const roleRotes = require("../role.routes");

const adminRoutes = require("express").Router();

adminRoutes.use("/permissions", permissionRoutes);
adminRoutes.use("/role", roleRotes);
adminRoutes.use("/blogs", blogRoutes);

module.exports = adminRoutes;
