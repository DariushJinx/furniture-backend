const UserController = require("../../http/controllers/users/user.controller");

const userRoutes = require("express").Router();

userRoutes.get("/list", UserController.getAllUsers);
userRoutes.patch("/update-profile", UserController.updateUserProfile);
userRoutes.patch("/update-role", UserController.updateUserRole);

module.exports = userRoutes;
