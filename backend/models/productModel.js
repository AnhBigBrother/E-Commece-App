import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: [
      {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
          id: { type: String, required: true },
          name: { type: String, required: true },
        },
      },
    ],
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);

export default Product;
