const permissionRoutes = require("../permisson.routes");

const adminRoutes = require("express").Router();

adminRoutes.use("/permissions", permissionRoutes);

module.exports = adminRoutes;
