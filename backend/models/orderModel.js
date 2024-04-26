import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'users',
    },
    items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: 'products',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    hasPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    state: {
      type: String,
      required: true,
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('orders', orderSchema);
export default Order;
