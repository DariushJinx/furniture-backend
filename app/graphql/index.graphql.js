const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const {
  createCommentForBlog,
  createCommentForProduct,
} = require("./mutations/comment.resolver");
const {
  BookmarkProduct,
  BookmarkBlog,
} = require("./mutations/bookmark.resolver");
const { LikedProduct, LikedBlog } = require("./mutations/likes.resolver");
const {
  DislikedBlog,
  DislikedProduct,
} = require("./mutations/dislikes.resolver");
const {
  AddProductToBasket,
  RemoveProductFromBasket,
  RemoveAllProducts,
} = require("./mutations/basket.resolver");

const {
  CategoryResolver,
  CategoryChildResolver,
} = require("./queries/category.resolver");
const {
  getUserBookmarkedBlogs,
  getUserBookmarkedProduct,
  getUserBasket,
} = require("./queries/user-profile.resolver");

const BlogResolver = require("./queries/blog.resolver");

const ProductResolver = require("./queries/product.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoryResolver,
    childOfCategory: CategoryChildResolver,
    getUserBookmarkedBlogs,
    getUserBookmarkedProduct,
    getUserBasket,
  },
});
const RootMutations = new GraphQLObjectType({
  name: "RootMutations",
  fields: {
    createCommentForBlog,
    createCommentForProduct,
    BookmarkProduct,
    BookmarkBlog,
    LikedProduct,
    LikedBlog,
    DislikedBlog,
    DislikedProduct,
    AddProductToBasket,
    RemoveProductFromBasket,
    RemoveAllProducts,
  },
});

const QLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
});

module.exports = QLSchema;
