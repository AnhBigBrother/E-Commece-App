import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  filterProduct,
  getProductById,
  addProductReview,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.route("/").get(filterProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .post(authenticate, addProductReview);

export default productRouter;
