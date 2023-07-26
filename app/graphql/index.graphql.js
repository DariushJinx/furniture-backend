const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const BlogResolver = require("./queries/blog.resolver");
const {
  CategoryResolver,
  CategoryChildResolver,
} = require("./queries/category.resolver");
const ProductResolver = require("./queries/product.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoryResolver,
    childOfCategory: CategoryChildResolver,
  },
});
const RootMutations = new GraphQLObjectType({
  name: "RootMutations",
  fields: {},
});

const QLSchema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutations,
});

module.exports = QLSchema;
