const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    invoiceNumber: { type: String },
    authority: { type: String },
    paymentData: { type: Number },
    amount: { type: Number },
    description: { type: String, default: "بابت خرید" },
    verify: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    user: { type: Object, default: {} },
    refID: { type: String, default: undefined },
    cardHash: { type: String, default: undefined },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("payments", paymentSchema);
