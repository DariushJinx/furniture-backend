const CategoryController = require("../../http/controllers/category/category.controller");

const categoryRoutes = require("express").Router();

categoryRoutes.post("/add", CategoryController.addCategory);
categoryRoutes.get("/parents", CategoryController.getAllParents);
categoryRoutes.get("/children/:parent", CategoryController.getChildOfParents);
categoryRoutes.get("/list", CategoryController.getAllCategory);
categoryRoutes.get(
  "/list-of-all",
  CategoryController.getAllCategoryWithoutPopulate
);
categoryRoutes.delete("/remove/:id", CategoryController.removeCategoryById);
categoryRoutes.patch("/update/:id", CategoryController.updateCategory);

module.exports = categoryRoutes;
