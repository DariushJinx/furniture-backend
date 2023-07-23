const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");

function notFound(res) {
  return res.status(HttpStatus.NOT_FOUND).json({
    statusCode: HttpStatus.NOT_FOUND,
    success: false,
    message: "The desired page or address was not found",
  });
}

function Errors(error, res) {
  const serverError = createHttpError.InternalServerError();
  const statusCode = error.status || serverError.status;
  const message = error.message || serverError.message;
  return res.status(statusCode).json({
    statusCode,
    errors: {
      message,
    },
  });
}

const ErrorHandler = {
  notFound,
  Errors,
};

module.exports = ErrorHandler;
