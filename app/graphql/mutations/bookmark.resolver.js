const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefinitions/public.type");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken.middleware");
const { checkExistProduct, checkExistBlog } = require("../utils.graphql");
const ProductModel = require("../../http/models/product.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const blogModel = require("../../http/models/blog.model");

const BookmarkProduct = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const bookmarkedProduct = await ProductModel.findOne({
      _id: productID,
      bookmarks: user._id,
    });
    const updateQuery = bookmarkedProduct
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await ProductModel.updateOne({ _id: productID }, updateQuery);
    let message;
    if (!bookmarkedProduct)
      message = "محصول به لیست علاقه مندی های شما اضافه شد";
    else message = "محصول از لیست علاقه مندی های شما حذف شد";
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const BookmarkBlog = {
  type: ResponseType,
  args: {
    blogID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogID } = args;
    await checkExistBlog(blogID);
    const bookmarkedBlog = await blogModel.findOne({
      _id: blogID,
      bookmarks: user._id,
    });
    const updateQuery = bookmarkedBlog
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await blogModel.updateOne({ _id: blogID }, updateQuery);
    let message;
    if (bookmarkedBlog)
      message = "مقاله مورد نظر از لیست علاقه مندی های شما حذف شد";
    else message = "مقاله مورد نظر به لیست علاقه مندی های شما اضافه شد";
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const bookmark = {
  BookmarkProduct,
  BookmarkBlog,
};

module.exports = bookmark;
