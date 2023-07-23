const { StatusCodes: HttpStatus } = require("http-status-codes");
const permissionModel = require("../../models/permission.model");
const Controller = require("../controller");
const { PermissionSchema } = require("../../validations/RBAC/RBAC.validation");
const createHttpError = require("http-errors");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../utils/functions.utils");

class Permission extends Controller {
  async getAllPermissions(req, res, next) {
    try {
      const permissions = await permissionModel.find({});
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "تمامی دسترسی ها به درستی بازگردانده شدند",
          permissions,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async createNewPermission(req, res, next) {
    try {
      const validations = await PermissionSchema.validateAsync(req.body);
      const { name, description } = validations;
      await this.findPermissionWithName(name);
      const permission = await permissionModel.create({ name, description });
      if (!permission)
        throw createHttpError.InternalServerError("دسترسی ایجاد نشد");
      return res.status(HttpStatus.CREATED).json({
        StatusCode: HttpStatus.CREATED,
        data: {
          message: "دسترسی مورد نظر ایجاد شد",
          permission,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async removePermission(req, res, next) {
    try {
      const { id } = req.params;
      const permission = await this.findPermissionWithID(id);
      const removeResult = await permissionModel.deleteOne({ _id: id });
      if (!removeResult.deletedCount)
        throw createHttpError.InternalServerError("دسترسی مورد نظر حذف نشد");
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "دسترسی مورد نظر با موفقیت حذف شد",
          permission,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async updatePermission(req, res, next) {
    try {
      const { id } = req.params;
      const permission = await this.findPermissionWithID(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, []);
      const updateResult = await permissionModel.updateOne(
        { _id: permission._id },
        {
          $set: data,
        }
      );
      if (!updateResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "به روزرسانی دسترسی مورد نظر انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "به روزرسانی دسترسی با موفقیت انجام شد",
          updateResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async findPermissionWithName(name) {
    const permission = await permissionModel.findOne({ name });
    if (permission)
      throw createHttpError.BadRequest("دسترسی مورد نظر قبلا ثبتت شده است");
  }

  async findPermissionWithID(_id) {
    const permission = await permissionModel.findOne({ _id });
    if (!permission) throw createHttpError.NotFound("دسترسی مورد نظر یافت نشد");
    return permission;
  }
}

const PermissionController = new Permission();
module.exports = PermissionController;
