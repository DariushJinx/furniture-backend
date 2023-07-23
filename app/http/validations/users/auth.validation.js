const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");

const getOtpValidation = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمی باشد")),
});

const checkOtpValidation = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمی باشد")),
  code: Joi.string()
    .min(4)
    .max(6)
    .error(createHttpError.BadRequest("کد وارد شده معتبر نمی باشد")),
});

const AuthValidation = {
  getOtpValidation,
  checkOtpValidation,
};

module.exports = AuthValidation;
