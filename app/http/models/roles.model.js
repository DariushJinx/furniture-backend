const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String, default: "" },
    permissions: {
      type: [mongoose.Types.ObjectId],
      ref: "permissions",
      default: [],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

roleSchema.virtual("permissions_details", {
  ref: "permissions",
  localField: "_id",
  foreignField: "permissions",
});

const roleModel = mongoose.model("roles", roleSchema);

module.exports = roleModel;
