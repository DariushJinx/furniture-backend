const createHttpError = require("http-errors");
const categoryModel = require("../../models/category.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  AddCategoryValidation,
  UpdateCategoryValidation,
} = require("../../validations/category/category.validation");
const Controller = require("../controller");

class Category extends Controller {
  async addCategory(req, res, next) {
    try {
      const validation = await AddCategoryValidation.validateAsync(req.body);
      const { title, parent } = validation;
      await this.checkExistCategoryWithTitle(title);
      const category = await categoryModel.create({ title, parent });
      if (!category) throw createHttpError.InternalServerError("خطای داخلی");
      return res.status(HttpStatus.CREATED).json({
        StatusCode: HttpStatus.CREATED,
        data: {
          message: "دسته بندی مورد نظر ایجاد شد",
          category,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async removeCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const removeResult = await categoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (!removeResult.deletedCount)
        throw createHttpError.InternalServerError(
          "حذف دسته بندی با موفقیت انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "حذف دسته بندی با موفقیت انجام شد",
          removeResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      const categories = await categoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "دسته بندی های موجود با موفقیت بازگردانده شدند",
          categories,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const validation = await UpdateCategoryValidation.validateAsync(req.body);
      const { title } = validation;
      const category = await this.checkExistCategory(id);
      const updateResult = await categoryModel.updateOne(
        { _id: id },
        { $set: { title } }
      );
      if (!updateResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "دسته بندی با موفقیت به روزرسانی نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "دسته بندی با موفقیت به روزرسانی شد",
          category,
          updateResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllParents(req, res, next) {
    try {
      const parents = await categoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "پرنت های موجود بازگردانده شدند",
          parents,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getChildOfParents(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await categoryModel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "زیرمجموعه های موجود با موفقیت بازگردانده شدند",
          children,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllCategoryWithoutPopulate(req, res, next) {
    const categories = await categoryModel.aggregate([{ $match: {} }]);
    return res.status(HttpStatus.OK).json({
      StatusCode: HttpStatus.OK,
      data: {
        message: "تمامی دسته بندی های موجود بازگردانده شدند",
        categories,
      },
    });
  }

  async checkExistCategory(id) {
    const category = await categoryModel.findById(id);
    if (!category)
      throw createHttpError.NotFound("دسته بندی مورد نظر یافت نشد");
    return category;
  }

  async checkExistCategoryWithTitle(title) {
    const category = await categoryModel.findOne({ title });
    if (category)
      throw createHttpError.BadRequest("دسته بندی مورد نظر قبلا ثبت شده است");
  }
}

const CategoryController = new Category();

module.exports = CategoryController;
