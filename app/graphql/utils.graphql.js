const { Kind } = require("graphql");
const blogModel = require("../http/models/blog.model");
const createHttpError = require("http-errors");
const ProductModel = require("../http/models/product.model");

function toObject(value) {
  if (typeof value === "object") {
    return value;
  }
  if (typeof value === "string" && value.charAt(0) === "{") {
    return JSON.parse(value);
  }
  return null;
}

function parseLiteral(valueNode) {
  switch (valueNode.kind) {
    case Kind.STRING:
      return valueNode.value.charAt(0) === "{"
        ? JSON.parse(valueNode.value)
        : valueNode.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(valueNode.value);
  }
}

async function checkExistBlog(id) {
  const blog = await blogModel.findById(id);
  if (!blog) throw createHttpError.NotFound("مقاله ای با این شناسه یافت نشد");
  return blog;
}

async function checkExistProduct(id) {
  const product = await ProductModel.findById(id);
  if (!product) throw createHttpError.NotFound("محصولی با این شناسه یافت نشد");
  return product;
}

const Utils = {
  toObject,
  parseLiteral,
  checkExistBlog,
  checkExistProduct,
};

module.exports = Utils;
