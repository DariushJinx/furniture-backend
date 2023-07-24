const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans.utils");

const AddCategoryValidation = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(
      createHttpError.BadRequest("عنوان دسته بندی ارسال شده صحیح نمی باشد")
    ),
  parent: Joi.string()
    .allow("")
    .pattern(MongoIDPattern)
    .allow("")
    .error(createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد")),
});

const UpdateCategoryValidation = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(
      createHttpError.BadRequest("عنوان دسته بندی ارسال شده صحیح نمی باشد")
    ),
});

const validation = {
  AddCategoryValidation,
  UpdateCategoryValidation,
};

module.exports = validation;
