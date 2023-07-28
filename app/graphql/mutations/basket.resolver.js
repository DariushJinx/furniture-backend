const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefinitions/public.type");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken.middleware");
const { checkExistProduct } = require("../utils.graphql");
const userModel = require("../../http/models/users.model");
const { copyObject } = require("../../utils/functions.utils");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");

const AddProductToBasket = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const product = await findProductInBasket(user._id, productID);
    if (product) {
      await userModel.updateOne(
        {
          _id: user._id,
          "basket.products.productID": productID,
        },
        {
          $inc: {
            "basket.products.$.count": 1,
          },
        }
      );
    } else {
      await userModel.updateOne(
        { _id: user._id },
        {
          $push: {
            "basket.products": {
              productID,
              count: 1,
            },
          },
        }
      );
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        message: "محصول با موفقیت به سبد خرید شما اضافه شد",
      },
    };
  },
};

const RemoveProductFromBasket = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const product = await findProductInBasket(user._id, productID);
    let message;
    if (!product)
      throw createHttpError.NotFound("محصول مورد نظر در سبد خرید شما یافت نشد");
    if (product.count > 1) {
      await userModel.updateOne(
        {
          _id: user._id,
          "basket.products.productID": productID,
        },
        {
          $inc: {
            "basket.products.$.count": -1,
          },
        }
      );
      message = "یک عدد از محصول مورد نظر از سبد خرید شما کم شد";
    } else {
      await userModel.updateOne(
        { _id: user._id, "basket.products.productID": productID },
        {
          $pull: {
            "basket.products": {
              productID,
            },
          },
        }
      );
      message = "محصول مورد نظر از داخل سبد خرید شما حذف شد";
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    };
  },
};

const RemoveAllProducts = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const product = await findProductInBasket(user._id, productID);
    if (!product)
      throw createHttpError.NotFound(
        "محصول مورد نظر در سبد خرید شما وجود ندارد"
      );
    await userModel.updateOne(
      {
        _id: user._id,
        "basket.products.productID": productID,
      },
      {
        $pull: {
          "basket.products": {
            productID,
          },
        },
      }
    );
    return {
      statusCode: HttpStatus.OK,
      data: {
        message: "محصول مورد نظر کاملا از سبد خرید شما حذف شد",
      },
    };
  },
};

async function findProductInBasket(userID, productID) {
  const findResult = await userModel.findOne(
    {
      _id: userID,
      "basket.products.productID": productID,
    },
    {
      "basket.products.$": 1,
    }
  );
  let userDetail = copyObject(findResult);
  return userDetail?.basket?.products?.[0];
}

const basket = {
  AddProductToBasket,
  RemoveProductFromBasket,
  RemoveAllProducts,
};

module.exports = basket;
