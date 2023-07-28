const { GraphQLList } = require("graphql");
const BlogType = require("../typeDefinitions/blog.type");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken.middleware");
const blogModel = require("../../http/models/blog.model");
const ProductType = require("../typeDefinitions/product.type");
const ProductModel = require("../../http/models/product.model");
const { AnyType } = require("../typeDefinitions/public.type");
const { getBasketOfUser } = require("../../utils/functions.utils");

const getUserBookmarkedBlogs = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const blogs = await blogModel
      .find({ bookmarks: user._id })
      .populate([
        { path: "author" },
        { path: "category" },
        { path: "comments.user" },
        { path: "comments.answers.user" },
        { path: "likes" },
        { path: "dislikes" },
        { path: "bookmarks" },
      ]);
    return blogs;
  },
};

const getUserBookmarkedProduct = {
  type: new GraphQLList(ProductType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const products = await ProductModel.find({ bookmarks: user._id }).populate([
      { path: "supplier" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return products;
  },
};

const getUserBasket = {
  type: AnyType,
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const userDetail = await getBasketOfUser(user._id);
    return userDetail;
  },
};

const userProfile = {
  getUserBookmarkedBlogs,
  getUserBookmarkedProduct,
  getUserBasket,
};

module.exports = userProfile;
