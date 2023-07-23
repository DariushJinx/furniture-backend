const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    description: { type: String, default: "" },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const permissionModel = mongoose.model("permissions", permissionSchema);

module.exports = permissionModel;
