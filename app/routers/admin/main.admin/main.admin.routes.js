const blogRoutes = require("../blog.routes");
const categoryRoutes = require("../category.routes");
const permissionRoutes = require("../permisson.routes");
const productRoutes = require("../product.routes");
const roleRotes = require("../role.routes");
const userRoutes = require("../user.routes");

const adminRoutes = require("express").Router();

adminRoutes.use("/permissions", permissionRoutes);
adminRoutes.use("/role", roleRotes);
adminRoutes.use("/blogs", blogRoutes);
adminRoutes.use("/category", categoryRoutes);
adminRoutes.use("/product", productRoutes);
adminRoutes.use("/users", userRoutes);

module.exports = adminRoutes;
