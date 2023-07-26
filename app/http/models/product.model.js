const mongoose = require("mongoose");
const { CommentSchema } = require("./public.model");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    comments: { type: [CommentSchema], default: [] },
    likes: {
      type: [mongoose.Types.ObjectId],
      ref: "users",
      default: [],
    },
    dislikes: {
      type: [mongoose.Types.ObjectId],
      ref: "users",
      default: [],
    },
    bookmarks: {
      type: [mongoose.Types.ObjectId],
      ref: "users",
      default: [],
    },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    type: { type: String, required: true }, //virtual-physical
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    features: {
      type: Object,
      default: {
        width: "",
        length: "",
        weight: "",
        height: "",
        colors : [],
        madeIn: "",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

productSchema.index({ title: "text", text: "text", short_text: "text" });
productSchema.virtual("imageURL").get(function () {
  return this.images.map(
    (image) =>
      `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`
  );
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
