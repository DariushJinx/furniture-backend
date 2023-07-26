const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AnyType } = require("./public.type");

const categoryType = new GraphQLObjectType({
  name: "categoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    children: { type: new GraphQLList(AnyType) },
  },
});

module.exports = categoryType;
