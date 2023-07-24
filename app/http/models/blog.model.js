const mongoose = require("mongoose");
const { CommentSchema } = require("./public.model");

const blogSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: false,
    },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

blogSchema.virtual("user_detail", {
  ref: "users",
  localField: "_id",
  foreignField: "author",
});
blogSchema.virtual("category_detail", {
  ref: "categories",
  localField: "_id",
  foreignField: "category",
});

blogSchema.virtual("image_URL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;
