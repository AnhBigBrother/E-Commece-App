import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "users",
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "products",
      },
    ],
    shippingAddress: {
      type: String,
      require: true,
    },
    total_price: {
      type: Number,
      require: true,
    },
    has_paid: {
      type: Boolean,
      require: true,
      default: false,
    },
    has_delivered: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);
export default Order;
