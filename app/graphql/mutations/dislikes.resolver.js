const { GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken.middleware");
const { checkExistBlog, checkExistProduct } = require("../utils.graphql");
const blogModel = require("../../http/models/blog.model");
const { ResponseType } = require("../typeDefinitions/public.type");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const ProductModel = require("../../http/models/product.model");

const DislikedBlog = {
  type: ResponseType,
  args: {
    blogID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogID } = args;
    await checkExistBlog(blogID);
    const dislikedBlog = await blogModel.findOne({
      _id: blogID,
      dislikes: user._id,
    });
    const likedBlog = await blogModel.findOne({
      _id: blogID,
      likes: user._id,
    });

    const updateQueryForDislikes = dislikedBlog
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    const updateQueryForLikes = likedBlog && { $pull: { likes: user._id } };
    await blogModel.updateOne({ _id: blogID }, updateQueryForDislikes);
    let message;
    if (!dislikedBlog) {
      if (likedBlog)
        await blogModel.updateOne({ _id: blogID }, updateQueryForLikes);
      message = "نپسندیدن محصول با موفقیت اضافه شد";
    } else message = "نپسندیدن محصول با موفقیت لغو شد";
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const DislikedProduct = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const dislikesProduct = await ProductModel.findOne({
      _id: productID,
      dislikes: user._id,
    });
    const likesProduct = await ProductModel.findOne({
      _id: productID,
      likes: user._id,
    });
    const updateQueryForDislikes = dislikesProduct
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    const updateQueryForLikes = likesProduct && { $pull: { likes: user._id } };
    await ProductModel.updateOne({ _id: productID }, updateQueryForDislikes);
    let message;
    if (!dislikesProduct) {
      if (likesProduct)
        await ProductModel.updateOne({ _id: productID }, updateQueryForLikes);
      message = "نپسندیدن محصول با موفقیت اضافه شد";
    } else message = "نپسندیدن محصول با موفقیت لغو شد";
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const dislikes = {
  DislikedBlog,
  DislikedProduct,
};

module.exports = dislikes;
