const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans.utils");
const userModel = require("../models/users.model");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createHttpError.Unauthorized(
    "حساب کاربری مورد نظر یافت نشد || وارد حساب کاربری خود شوید"
  );
}

function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      try {
        if (err)
          throw createHttpError.Unauthorized("وارد حساب کاربری خود شوید");
        const { mobile } = payload || {};
        const user = await userModel.findOne(
          { mobile },
          {
            password: 0,
            otp: 0,
          }
        );
        if (!user)
          throw createHttpError.Unauthorized("حساب کاربری مورد نظر یافت نشد");
        req.user = user;
        return next();
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
}

async function VerifyAccessTokenInGraphQL(req) {
  try {
    const token = getToken(req.headers);
    const { mobile } = JWT.verify(token, ACCESS_TOKEN_SECRET_KEY);
    const user = await userModel.findOne({ mobile }, { password: 0, otp: 0 });
    if (!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد");
    return user;
  } catch (err) {
    throw new createHttpError.Unauthorized("حساب کاربری یافت نشد");
  }
}

const middlewareAccessToken = {
  getToken,
  verifyAccessToken,
  VerifyAccessTokenInGraphQL,
};

module.exports = middlewareAccessToken;
