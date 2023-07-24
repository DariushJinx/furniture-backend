const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans.utils");

const RoleSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان وارد شده صحیح نمی باشد")),
  description: Joi.string()
    .min(0)
    .max(100)
    .error(createHttpError.BadRequest("توضیحات وارد شده نقش صحیح نمی باشد")),
  permissions: Joi.array()
    .items(Joi.string().pattern(MongoIDPattern))
    .error(createHttpError.BadRequest("دسترسی های ارسال شده صحیح نمیباشد")),
});
const PermissionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("نام وارد شده صحیح نمی باشد")),
  description: Joi.string()
    .min(0)
    .max(100)
    .error(createHttpError.BadRequest("توضیحات وارد شده دسترسی صحیح نمی باشد")),
});

const RBACValidation = {
  RoleSchema,
  PermissionSchema,
};

module.exports = RBACValidation;
