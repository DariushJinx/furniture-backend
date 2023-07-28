const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefinitions/public.type");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken.middleware");
const { checkExistProduct, checkExistBlog } = require("../utils.graphql");
const ProductModel = require("../../http/models/product.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogModel = require("../../http/models/blog.model");

const LikedProduct = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const likesProduct = await ProductModel.findOne({
      _id: productID,
      likes: user._id,
    });
    const dislikesProduct = await ProductModel.findOne({
      _id: productID,
      dislikes: user._id,
    });
    const updateQueryForLikes = likesProduct
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    const updateQueryForDislikes = dislikesProduct && {
      $pull: { dislikes: user._id },
    };
    await ProductModel.updateOne({ _id: productID }, updateQueryForLikes);
    let message;
    if (!likesProduct) {
      if (dislikesProduct) {
        await ProductModel.updateOne(
          { _id: productID },
          updateQueryForDislikes
        );
      }
      message = "پسندیدن محصول با موفقیت انجام شد";
    } else message = "پسندیدن محصول با موفقیت لغو شد";
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const LikedBlog = {
  type: ResponseType,
  args: {
    blogID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogID } = args;
    await checkExistBlog(blogID);
    const likesBlog = await blogModel.findOne({
      _id: blogID,
      likes: user._id,
    });
    const dislikesBlog = await blogModel.findOne({
      _id: blogID,
      dislikes: user._id,
    });
    const updateQueryForLikes = likesBlog
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    const updateQueryForDislikes = dislikesBlog && {
      $pull: { dislikes: user._id },
    };
    await blogModel.updateOne({ _id: blogID }, updateQueryForLikes);
    let message;
    if (!likesBlog) {
      if (dislikesBlog) {
        await blogModel.updateOne({ _id: blogID }, updateQueryForDislikes);
      }
      message = "پسندیدن محصول با موفقیت انجام شد";
    } else message = "پسندیدن محصول با موفقیت لغو شد";
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const likes = {
  LikedProduct,
  LikedBlog,
};

module.exports = likes;
