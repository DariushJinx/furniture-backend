const Controller = require("../controller");
const userModel = require("../../models/users.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../utils/functions.utils");
const createHttpError = require("http-errors");

class User extends Controller {
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query;
      let dataQuery = {};
      if (search) dataQuery["$text"] = { $search: search };
      const users = await userModel.find(dataQuery);
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "تمامی کاربران موجود بازگردانده شدند",
          users,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async updateUserProfile(req, res, next) {
    try {
      const UserID = req.user._id;
      const data = copyObject(req.body);
      const BlackList = ["mobile", "otp", "bills", "discount", "Role"];
      deleteInvalidPropertyInObject(data, BlackList);
      const updateResult = await userModel.updateOne(
        { _id: UserID },
        { $set: data }
      );
      if (!updateResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "به روزرسانی کاربر با موفقیت انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "به روزرسانی کاربر با موفقیت انجام شد",
          updateResult,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async updateUserRole(req, res, next) {
    try {
      const userID = req.user._id;
      const user = await userModel.findById(userID);
      const data = copyObject(req.body);
      const updateResult = await userModel.updateOne(
        { _id: user._id },
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

  async findUserWithID(userID) {
    const user = await userModel.findById(userID);
    if (!user) throw createHttpError.NotFound("کاربر مورد نظر یافت نشد");
    return user;
  }
}

const UserController = new User();

module.exports = UserController;
