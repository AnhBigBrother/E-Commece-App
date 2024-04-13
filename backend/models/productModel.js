import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    categories: { type: Array, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

export default Product;
