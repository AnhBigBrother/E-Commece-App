import express from "express";
import multer from "multer";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  uploadProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  removeProductById,
  getAllUser,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  getAllBrands,
  getAllCategories,
  createCategory,
} from "../controllers/adminController.js";

const upload = multer({ storage: multer.memoryStorage() });
const adminRouter = express.Router();

adminRouter
  .route("/categories")
  .get(getAllCategories)
  .post(authenticate, authorizeAdmin, createCategory);

adminRouter.route("/brands").get(getAllBrands);

adminRouter
  .route("/products")
  .get(authenticate, authorizeAdmin, getAllProduct)
  .post(
    authenticate,
    authorizeAdmin,
    upload.single("productImage"),
    uploadProduct
  );

adminRouter
  .route("/products/:id")
  .get(authenticate, authorizeAdmin, getProductById)
  .patch(
    authenticate,
    authorizeAdmin,
    upload.single("productImage"),
    updateProductById
  )
  .delete(authenticate, authorizeAdmin, removeProductById);

adminRouter.route("/users").get(authenticate, authorizeAdmin, getAllUser);

adminRouter
  .route("/users/:id")
  .get(authenticate, authorizeAdmin, getUserInfo)
  .patch(authenticate, authorizeAdmin, updateUserInfo)
  .delete(authenticate, authorizeAdmin, deleteUser);

export default adminRouter;
