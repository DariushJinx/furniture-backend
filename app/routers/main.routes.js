const { createHandler } = require("graphql-http/lib/use/express");
const QLSchema = require("../graphql/index.graphql");
const {
  verifyAccessToken,
} = require("../http/middlewares/verifyAccessToken.middleware");
const adminRoutes = require("./admin/main.admin/main.admin.routes");
const indexRoutes = require("./index/index.routes");
const authRoutes = require("./user/auth.routes");

const AllRouter = require("express").Router();

AllRouter.use("/", indexRoutes);
AllRouter.use("/user", authRoutes);
AllRouter.use("/admin", verifyAccessToken, adminRoutes);
AllRouter.all("/graphql", createHandler({ schema: QLSchema }));
module.exports = AllRouter;
