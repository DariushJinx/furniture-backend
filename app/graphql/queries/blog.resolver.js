const { GraphQLList, GraphQLString } = require("graphql");
const BlogType = require("../typeDefinitions/blog.type");
const blogModel = require("../../http/models/blog.model");

const BlogResolver = {
  type : new GraphQLList(BlogType),
  args : {
      category : {type : GraphQLString}
  },
  resolve : async (_, args) => {
      const {category} = args
      const findQuery = category? {category} : {}
      return await blogModel.find(findQuery).populate([
          {path : 'author'}, 
          {path: "category"}, 
          // {path: "comments.user"},
          // {path: "comments.answer.user"},
          {path: "likes"},
          {path: "dislikes"},
          {path: "bookmarks"},
      ]);
  }
}

module.exports = BlogResolver;
