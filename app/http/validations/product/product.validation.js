const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans.utils");

const CreateProductValidation = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان ارسالی محصول صحیح نمی باشد")),
  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسالی محصول صحیح نمی باشد")
  ),
  short_text: Joi.string().error(
    createHttpError.BadRequest("متن کوتاه ارسالی محصول صحیح نمی باشد")
  ),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(
      createHttpError.BadRequest(
        "برچسب های ارسالی نمی تواند بیشتر از 20 عدد باشد"
      )
    ),
  colors: Joi.array()
    .min(0)
    .max(20)
    .error(
      createHttpError.BadRequest(
        "رنگ های ارسالی نمی تواند بیشتر از 20 عدد باشد"
      )
    ),
  category: Joi.string()
    .regex(MongoIDPattern)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  price: Joi.number().error(
    createHttpError.BadRequest("قیمت وارد شده صحیح نمی باشد")
  ),
  discount: Joi.number().error(
    createHttpError.BadRequest("تخفیف وارد شده صحیح نمی باشد")
  ),
  count: Joi.number().error(
    createHttpError.BadRequest("تعداد وارد شده صحیح نمی باشد")
  ),
  weight: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("وزن وارد شده صحیح نمی باشد")),
  height: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("ارتفاع وارد شده صحیح نمی باشد")),
  width: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("عرض وارد شده صحیح نمی باشد")),
  length: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("طول وارد شده صحیح نمی باشد")),
  type: Joi.string().regex(/(virtual|physical)/i),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("فرمت ارسالی تصویر صحیح نمی باشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = CreateProductValidation;
