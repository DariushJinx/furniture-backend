const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constans.utils");
const createHttpError = require("http-errors");
const ObjectIdValidator = Joi.object({
  id: Joi.string()
    .pattern(MongoIDPattern)
    .error(
      createHttpError.BadRequest(
        new createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد")
      )
    ),
});

module.exports = ObjectIdValidator;
