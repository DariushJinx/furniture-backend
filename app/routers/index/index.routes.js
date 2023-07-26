const HomeController = require("../../http/controllers/home/home.controller");
const {
  verifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken.middleware");

const indexRoutes = require("express").Router();

indexRoutes.get("/", HomeController.indexPage);

module.exports = indexRoutes;
