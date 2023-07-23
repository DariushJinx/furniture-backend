const HomeController = require("../../http/controllers/home/home.controller");
const {
  verifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken.middleware");

const indexRoutes = require("express").Router();

indexRoutes.get("/", verifyAccessToken, HomeController.indexPage);

module.exports = indexRoutes;
