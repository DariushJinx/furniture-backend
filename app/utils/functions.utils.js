const userModel = require("../http/models/users.model");
const JWT = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constans.utils");
const createHttpError = require("http-errors");
const redisClient = require("./initRedis.utils");

function RandomNumberGenerator() {
  return ~~(Math.random() * 90000 + 10000);
}

function signAccessToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userID);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1w",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
}

function SignRefreshToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userID);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      await redisClient.SETEX(String(userID), 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise(async (resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        throw reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await userModel.findOne({ mobile }, { otp: 0, password: 0 });
      if (!user)
        throw reject(
          createHttpError.Unauthorized("حساب کاربری مورد نظر یافت نشد")
        );
      const refreshToken = await redisClient.get(String(user?._id));
      if (!refreshToken)
        reject(
          createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد")
        );
      if (refreshToken === token) return resolve(mobile);
      reject(
        createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد")
      );
    });
  });
}

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}
function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", 0, "0", null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key] && data[key].length > 0))
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key] && data[key].length == 0)) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}

function ListOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}

function setFeatures(body) {
  const { width, length, height, weight, colors , madeIn } = body;
  let features = {};
  features.colors = colors;
  if (!isNaN(+width) || !isNaN(+length) || !isNaN(+height) || !isNaN(+weight)) {
    if (!width) features.width = 0;
    else features.width = +width;
    if (!length) features.length = 0;
    else features.length = +length;
    if (!height) features.height = 0;
    else features.height = +height;
    if (!weight) features.weight = 0;
    else features.weight = +weight;
    
  }
  features.madeIn = madeIn
  return features;
}

async function getBasketOfUser(userID, discount = {}) {
  const userDetail = await userModel.aggregate([
    {
      $match: { _id: userID },
    },
    {
      $project: { basket: 1 },
    },
    {
      $lookup: {
        from: "products",
        localField: "basket.products.productID",
        foreignField: "_id",
        as: "productDetail",
      },
    },
    {
      $addFields: {
        productDetail: {
          $function: {
            body: function (productDetail, products) {
              return productDetail.map(function (product) {
                const count = products.find(
                  (item) => item.productID.valueOf() == product._id.valueOf()
                ).count;
                const totalPrice = count * product.price;
                return {
                  ...product,
                  basketCount: count,
                  totalPrice,
                  finalPrice:
                    totalPrice - (product.discount / 100) * totalPrice,
                };
              });
            },
            args: ["$productDetail", "$basket.products"],
            lang: "js",
          },
        },
        payDetail: {
          $function: {
            body: function (productDetail, products) {
              const productAmount = productDetail.reduce(function (
                total,
                product
              ) {
                const count = products.find(
                  (item) => item.productID.valueOf() == product._id.valueOf()
                ).count;
                const totalPrice = count * product.price;
                return (
                  total + (totalPrice - (product.discount / 100) * totalPrice)
                );
              },
              0);
              const productIDs = productDetail.map((product) =>
                product._id.valueOf()
              );
              return {
                productAmount,
                paymentAmount: productAmount,
                productIDs,
              };
            },
            args: ["$productDetail", "$basket.products"],
            lang: "js",
          },
        },
      },
    },
    {
      $project: { basket: 0 },
    },
  ]);
  return copyObject(userDetail);
}

const functions = {
  RandomNumberGenerator,
  signAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
  copyObject,
  deleteInvalidPropertyInObject,
  deleteFileInPublic,
  ListOfImagesFromRequest,
  setFeatures,
  getBasketOfUser,
};

module.exports = functions;
