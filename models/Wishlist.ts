import { InferSchemaType, Model } from "mongoose";
const mongoose = require("mongoose");
require("@/models/Product")
require("@/models/Comment")

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type IWishlist = InferSchemaType<typeof schema>;

const model: Model<IWishlist> =
  mongoose.models.Wishlist || mongoose.model("Wishlist", schema);

export default model;
