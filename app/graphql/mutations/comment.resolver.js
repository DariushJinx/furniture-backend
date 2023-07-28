const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefinitions/public.type");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken.middleware");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const { checkExistBlog, checkExistProduct } = require("../utils.graphql");
const { copyObject } = require("../../utils/functions.utils");
const blogModel = require("../../http/models/blog.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const ProductModel = require("../../http/models/product.model");

const createCommentForBlog = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    blogID: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, blogID, parent } = args;
    if (!mongoose.isValidObjectId(blogID))
      throw createHttpError.BadGateway("شناسه بلاگ ارسال شده صحیح نمی باشد");
    await checkExistBlog(blogID);
    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(blogModel, parent);
      if (commentDocument && !commentDocument?.openToComment)
        throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
      const createAnswerResult = await blogModel.updateOne(
        { "comments._id": parent },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount)
        throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
      return {
        StatusCode: HttpStatus.CREATED,
        data: {
          message: "پاسخ شما با موفقیت ثبت شد",
          createAnswerResult,
        },
      };
    } else {
      await blogModel.updateOne(
        { _id: blogID },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToComment: true,
            },
          },
        }
      );
    }
    return {
      StatusCode: HttpStatus.CREATED,
      data: {
        message: "ثبت نظر با موفقیت انجام شد پس از تایید در سایت قرار میگیرد",
      },
    };
  },
};

const createCommentForProduct = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    productID: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, productID, parent } = args;
    if (!mongoose.isValidObjectId(productID))
      throw createHttpError.BadGateway("شناسه محصول ارسال شده صحیح نمی باشد");
    await checkExistProduct(productID);

    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(ProductModel, parent);
      console.log("commentDocument : ", commentDocument);
      if (commentDocument && !commentDocument?.openToComment)
        throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
      const answerResult = await ProductModel.updateOne(
        {
          _id: productID,
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );
      if (!answerResult.modifiedCount)
        throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
      return {
        StatusCode: HttpStatus.CREATED,
        data: {
          message: "ثبت پاسخ با موفقیت انجام شد",
          answerResult,
        },
      };
    } else {
      await ProductModel.updateOne(
        { _id: productID },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToComment: true,
            },
          },
        }
      );
    }
    return {
      StatusCode: HttpStatus.CREATED,
      data: {
        message: "ثبت پاسخ با موفقیت انجام شد پس از تایید در سایت قرار میگیرد",
      },
    };
  },
};

async function getComment(model, id) {
  const findComment = await model.findOne(
    { "comments._id": id },
    { "comments.$": 1 }
  );

  if (!findComment?.comments?.[0])
    throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
  return findComment?.comments?.[0];
}

const comment = {
  createCommentForBlog,
  createCommentForProduct,
};

module.exports = comment;
