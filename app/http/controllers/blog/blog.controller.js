const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogModel = require("../../models/blog.model");
const Controller = require("../controller");
const createBlogValidation = require("../../validations/blog/blog.validation");
const path = require("path");
const {
  deleteFileInPublic,
  deleteInvalidPropertyInObject,
  copyObject,
} = require("../../../utils/functions.utils");
const createHttpError = require("http-errors");

class Blog extends Controller {
  async getListOfBlogs(req, res, next) {
    try {
      // const blogs = await blogModel.find({})
      const blogs = await blogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        // {
        //   $lookup: {
        //     from: "categories",
        //     foreignField: "_id",
        //     localField: "category",
        //     as: "category",
        //   },
        // },
        // {
        //   $unwind: "$category",
        // },
        {
          $project: {
            "author.__v": 0,
            "category.__v": 0,
            "author.otp": 0,
            "author.Roles": 0,
            "author.discount": 0,
            "author.bills": 0,
          },
        },
      ]);
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "تمامی مقاله ها با موفقیت بازگردانده شدند",
          blogs,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogValidation.validateAsync(req.body);
      req.body.image = path
        .join(blogDataBody.fileUploadPath, blogDataBody.filename)
        .replace(/\\/g, "/");
      const { title, text, short_text, category, tags } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await blogModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        image,
        author,
      });
      return res.status(HttpStatus.CREATED).json({
        StatusCode: HttpStatus.CREATED,
        data: {
          message: "مقاله مورد نظر ایجاد شد",
          blog,
        },
      });
    } catch (err) {
      deleteFileInPublic(req.body.image);
      next(err);
    }
  }

  async getOneBlogById(req, res, next) {
    const { id } = req.params;
    const blog = await this.findBlogWithID(id);
    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      data: {
        message: "مقاله مورد نظر به درستی بازگردانده شد",
        blog,
      },
    });
  }

  async deleteBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlogWithID(id);
      const deleteResult = await blogModel.deleteOne({ _id: id });
      if (!deleteResult.deletedCount)
        throw createHttpError.InternalServerError(
          "حذف مقاله مورد نظر با موفقیت انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "حذف مقاله مورد نظر با موفقیت انجام شد",
          blog,
          deleteResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlogWithID(id);
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path
          .join(req.body.fileUploadPath, req.body.filename)
          .replace(/\\/g, "/");
      }
      const data = copyObject(req.body);
      let blackListFields = [
        "bookmarks",
        "likes",
        "dislikes",
        "author",
        "comments",
      ];
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateResult = await blogModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (!updateResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "به روز رسانی مقاله انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "به روز رسانی مقاله انجام شد",
          blog,
          updateResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async findBlogWithID(id) {
    const blog = await blogModel.findById(id).populate([
      { path: "category", select: ["title"] },
      {
        path: "author",
        select: ["mobile", "first_name", "last_name", "username"],
      },
    ]);

    if (!blog) throw createHttpError.NotFound("مقاله ای یافت نشد");
    // delete blog.category.children;
    return blog;
  }
}

const BlogController = new Blog();

module.exports = BlogController;
