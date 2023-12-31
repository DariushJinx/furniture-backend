const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLScalarType,
} = require("graphql");
const { toObject, parseLiteral } = require("../utils.graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});

const PublicCategoryType = new GraphQLObjectType({
  name: "PublicCategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

const AnyType = new GraphQLScalarType({
  name: "AnyType",
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral,
});

const ResponseType = new GraphQLObjectType({
  name: "ResponseType",
  fields: {
    statusCode: { type: GraphQLString },
    data: { type: AnyType },
  },
});

const public = {
  UserType,
  PublicCategoryType,
  AnyType,
  ResponseType
};

module.exports = public;
