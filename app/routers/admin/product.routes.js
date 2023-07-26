const ProductController = require("../../http/controllers/product/product.controller");
const stringToArray = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer.utils");

const productRoutes = require("express").Router();

productRoutes.post(
  "/add",
  uploadFile.array("images", 10),
  stringToArray("tags", "colors"),
  ProductController.addProduct
);
productRoutes.get("/list", ProductController.getAllProducts);
productRoutes.patch(
  "/update/:id",
  uploadFile.array("images", 10),
  stringToArray("tags", "colors"),
  ProductController.updateProduct
);
productRoutes.get("/:id", ProductController.getOneProduct);
productRoutes.delete("/remove/:id", ProductController.removeProductById);

module.exports = productRoutes;
