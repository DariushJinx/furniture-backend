const createHttpError = require("http-errors");
const {
  ListOfImagesFromRequest,
  setFeatures,
  deleteFileInPublic,
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../utils/functions.utils");
const ProductModel = require("../../models/product.model");
const CreateProductValidation = require("../../validations/product/product.validation");
const ObjectIdValidator = require("../../validations/public/public.validator");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");

const ProductBlackList = {
  BOOKMARKS: "bookmarks",
  LIKES: "likes",
  DISLIKES: "dislikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WEIGHT: "weight",
  WIDTH: "width",
  LENGTH: "length",
  HEIGHT: "height",
  COLORS: "colors",
};

class Product extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = ListOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const validation = await CreateProductValidation.validateAsync(req.body);
      const {
        title,
        text,
        short_text,
        tags,
        category,
        count,
        price,
        discount,
        type,
      } = validation;
      const supplier = req.user._id;
      let features = setFeatures(req.body);
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        tags,
        category,
        count,
        price,
        discount,
        type,
        images,
        supplier,
        features,
      });
      return res.status(HttpStatus.CREATED).json({
        StatusCode: HttpStatus.CREATED,
        data: {
          message: "محصول مورد نظر با موفقیت ایجاد شد",
          product,
        },
      });
    } catch (err) {
      deleteFileInPublic(req.body.images);
      next(err);
    }
  }
  async getAllProducts(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products;
      if (search) {
        products = await ProductModel.find({
          $text: {
            $search: new RegExp(search, "ig"),
          },
        });
      } else {
        products = await ProductModel.find({});
      }
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "تمامی محصول های موجود بازگردانده شدند",
          products,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      const data = copyObject(req.body);
      data.images = ListOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      data.features = setFeatures(req.body);
      let blackListFields = Object.values(ProductBlackList);
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateResult = await ProductModel.updateOne(
        { _id: product._id },
        { $set: data }
      );
      if (!updateResult.modifiedCount)
        throw {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "خطای داخلی",
        };
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "به روزرسانی با موفقیت انجام شد",
        },
      });
    } catch (err) {
      deleteFileInPublic(req.body.images);
      next(err);
    }
  }

  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "محصول مورد نظر با موفقیت بازگردانده شد",
          product,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async removeProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      const removeResult = await ProductModel.deleteOne({ _id: product._id });
      if (!removeResult.deletedCount)
        throw createHttpError.InternalServerError(
          "حذف محصول با موفقیت انجام نشد"
        );
      return res.status(HttpStatus.OK).json({
        StatusCode: HttpStatus.OK,
        data: {
          message: "حذف محصول با موفقیت انجام شد",
          product,
          removeResult,
        },
      });
    } catch (err) {
      deleteFileInPublic(req.body.images);
      next(err);
    }
  }

  async findProductByID(productID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);
    if (!product) throw new createHttpError.NotFound("محصول مورد نظر یافت نشد");
    return product;
  }
}

const ProductController = new Product();

module.exports = ProductController;
