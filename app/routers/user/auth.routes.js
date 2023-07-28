

const AuthController = require("../../http/controllers/auth/auth.controller");

const authRoutes = require("express").Router();

authRoutes.post("/get-otp", AuthController.getOtp);
authRoutes.post("/check-otp", AuthController.checkOtp);
authRoutes.post("/refresh-token", AuthController.refreshToken);

module.exports = authRoutes;
