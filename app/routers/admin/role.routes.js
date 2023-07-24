const RoleController = require("../../http/controllers/RBAC/role.controller");
const stringToArray = require("../../http/middlewares/stringToArray");

const roleRotes = require("express").Router();

roleRotes.get("/list", RoleController.getAllRoles);
roleRotes.post(
  "/create",
  stringToArray("permissions"),
  RoleController.createNewRole
);
roleRotes.patch(
  "/update/:id",
  stringToArray("permissions"),
  RoleController.updateRoleWithID
);
roleRotes.delete("/delete/:field", RoleController.removeRole);

module.exports = roleRotes;
