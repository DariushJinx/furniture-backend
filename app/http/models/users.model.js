const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productID: { type: mongoose.Types.ObjectId, ref: "products" },
  count: { type: Number, default: 1 },
});

const BasketSchema = new mongoose.Schema({
  products: { type: [ProductSchema], default: [] },
});

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0,
      },
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    token: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
    Role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    Products: { type: [mongoose.Types.ObjectId], ref: "products", default: [] },
    basket: { type: BasketSchema },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.count = 1;

userSchema.index({
  first_name: "text",
  last_name: "text",
  username: "text",
  mobile: "text",
  email: "text",
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
