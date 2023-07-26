const { GraphQLList, GraphQLString } = require("graphql");
const categoryType = require("../typeDefinitions/category.type");
const categoryModel = require("../../http/models/category.model");

const CategoryResolver = {
  type: new GraphQLList(categoryType),
  resolve: async () => {
    const categories = await categoryModel.find({ parent: undefined });
    return categories;
  },
};

const CategoryChildResolver = {
  type: new GraphQLList(categoryType),
  args: {
    parent: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { parent } = args;
    const categories = await categoryModel.find({ parent });
    return categories;
  },
};

const Categories = {
  CategoryResolver,
  CategoryChildResolver,
};

module.exports = Categories;
