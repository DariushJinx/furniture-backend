const { StatusCodes: HttpStatus } = require("http-status-codes");
const roleModel = require("../../models/roles.model");
const Controller = require("../controller");
const { RoleSchema } = require("../../validations/RBAC/RBAC.validation");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../utils/functions.utils");

class Role extends Controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await roleModel.find({});
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "نقش های موجود با موفقیت بازگردانده شدند",
          roles,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async createNewRole(req, res, next) {
    try {
      const { title, permissions, description } =
        await RoleSchema.validateAsync(req.body);
      await this.findRoleWithTitle(title);
      const role = await roleModel.create({ title, permissions, description });
      if (!role) throw createHttpError.InternalServerError("نقش ایجاد نشد");
      return res.status(HttpStatus.CREATED).json({
        StatusCode: HttpStatus.CREATED,
        data: {
          message: "نقش جدید ایجاد شد",
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeRole(req, res, next) {
    try {
      const { field } = req.params;
      const role = await this.findRoleWithIdOrTitle(field);
      const removeResult = await roleModel.deleteOne({ _id: role._id });
      if (!removeResult.deletedCount)
        throw createHttpError.InternalServerError(
          "حذف نقش با موفقیت انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "حذف نقش با موفقیت انجام شد",
          removeResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateRoleWithID(req, res, next) {
    try {
      const { id } = req.params;
      const role = await this.findRoleWithIdOrTitle(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, []);
      const updateResult = await roleModel.updateOne(
        { _id: role._id },
        { $set: data }
      );
      if (!updateResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "به روزرسانی نقش با موفقیت انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "به روزرسانی نقش با موفقیت انجام شد",
          updateResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async findRoleWithTitle(title) {
    const role = await roleModel.findOne({ title });
    if (role) throw createHttpError.BadRequest("این نقش قبلا ثبت شده است");
  }

  async findRoleWithIdOrTitle(field) {
    let findQuery = mongoose.isValidObjectId(field)
      ? { _id: field }
      : { title: field };
    const role = await roleModel.findOne(findQuery);
    if (!role) throw createHttpError.NotFound("نقش مورد نظر یافت نشد");
    return role;
  }
}

const RoleController = new Role();
module.exports = RoleController;
