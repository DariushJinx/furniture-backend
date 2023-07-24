const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans.utils");

const createBlogValidation = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان مقاله صحیح نمی باشد")),
  text: Joi.string().error(
    createHttpError.BadRequest("متن مقاله صحیح نمی باشد")
  ),
  short_text: Joi.string().error(
    createHttpError.BadRequest("متن کوتاه مقاله صحیح نمی باشد")
  ),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(
      createHttpError.BadRequest("برچسب ها حداقل 0 و حداکثر 20 عدد می باشند")
    ),
  category: Joi.string()
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("فرمت تصویر ارسال شده صحیح نمی باشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = createBlogValidation;
