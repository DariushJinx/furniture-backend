const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { PublicCategoryType, UserType } = require("./public.type");
const CommentType = require("./comment.type");

const FeaturesType = new GraphQLObjectType({
  name: "FeaturesType",
  fields: {
    width: { type: GraphQLString },
    length: { type: GraphQLString },
    weight: { type: GraphQLString },
    height: { type: GraphQLString },
    madeIn: { type: GraphQLString },
    colors: { type: new GraphQLList(GraphQLString) },
  },
});

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    imageURL: { type: new GraphQLList(GraphQLString) },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: PublicCategoryType },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    supplier: { type: UserType },
    features: { type: FeaturesType },
    comments: { type: new GraphQLList(CommentType) },
    likes: { type: new GraphQLList(UserType) },
    dislikes: { type: new GraphQLList(UserType) },
    bookmarks: { type: new GraphQLList(UserType) },
  },
});

module.exports = ProductType;
