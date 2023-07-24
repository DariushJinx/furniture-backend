const BlogController = require("../../http/controllers/blog/blog.controller");
const stringToArray = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer.utils");

const blogRoutes = require("express").Router();

blogRoutes.get("/", BlogController.getListOfBlogs);
blogRoutes.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.createBlog
);
blogRoutes.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.updateBlogById
);
blogRoutes.get("/:id", BlogController.getOneBlogById);
blogRoutes.delete("/:id", BlogController.deleteBlogById);

module.exports = blogRoutes;
