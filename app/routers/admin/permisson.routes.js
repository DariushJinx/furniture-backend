const PermissionController = require("../../http/controllers/RBAC/permission.controller");

const permissionRoutes = require("express").Router();

permissionRoutes.get("/list", PermissionController.getAllPermissions);
permissionRoutes.post("/create", PermissionController.createNewPermission);
permissionRoutes.delete("/remove/:id", PermissionController.removePermission);
permissionRoutes.patch("/update/:id", PermissionController.updatePermission);

module.exports = permissionRoutes;
