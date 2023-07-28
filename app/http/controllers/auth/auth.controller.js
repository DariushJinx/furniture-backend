const createHttpError = require("http-errors");
const {
  RandomNumberGenerator,
  signAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
} = require("../../../utils/functions.utils");
const userModel = require("../../models/users.model");
const {
  getOtpValidation,
  checkOtpValidation,
} = require("../../validations/users/auth.validation");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class Auth extends Controller {
  async getOtp(req, res, next) {
    try {
      const validation = await getOtpValidation.validateAsync(req.body);
      const { mobile } = validation;
      const code = RandomNumberGenerator();
      const result = await this.saveUser(code, mobile);
      if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد");
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
          code,
          mobile,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async checkOtp(req, res, next) {
    try {
      const body = await checkOtpValidation.validateAsync(req.body);
      const { mobile, code } = body;
      const user = await userModel.findOne(
        { mobile },
        { password: 0, accessToken: 0 }
      );
      if (!user) throw createHttpError.NotFound("کاربر مورد نظر یافت نشد");
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("کد وارد شده معتبر نمی باشد");
      const now = new Date().getTime();
      if (+user.otp.expiresIn < now)
        throw createHttpError.Unauthorized("کد وارد شده منقضی شده است");
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await SignRefreshToken(user._id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "کد ارسال شده صحیح می باشد",
          accessToken,
          refreshToken,
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await verifyRefreshToken(refreshToken);
      const user = await userModel.findOne({ mobile });
      const accessToken = await signAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "توکن جدید ایجاد شد",
          accessToken,
          refreshToken: newRefreshToken,
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async saveUser(code, mobile) {
    const now = new Date().getTime();
    let otp = {
      code,
      expiresIn: now + 2592000,
    };
    const user = await this.checkExistUser(mobile);
    const countOfRegisteredUser = await userModel.count();
    if (user) {
      if (+user.otp.expiresIn > now)
        throw createHttpError.Forbidden(
          "کد اعتبار سنجی قبلی هنوز منقضی نشده است"
        );
      return await this.updateUser(mobile, { otp });
    }
    return await userModel.create({
      mobile,
      otp,
      Role: countOfRegisteredUser > 0 ? "USER" : "ADMIN",
    });
  }

  async checkExistUser(mobile) {
    const user = await userModel.findOne({ mobile });
    return user;
  }

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, "0", NaN, null, undefined].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await userModel.updateOne(
      { mobile },
      {
        $set: objectData,
      }
    );
    return !!updateResult.modifiedCount;
  }
}

const AuthController = new Auth();

module.exports = AuthController;
