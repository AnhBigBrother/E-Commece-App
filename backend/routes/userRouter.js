import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  logCurrentUserOut,
  addToCart,
  addToFavorite,
  removeFromCart,
  removeFromFavorite,
  getCart,
  getFavorite,
  getUserOrders,
  createOrder,
  cancelOrder,
} from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.route('/').get(authenticate, getCurrentUserProfile).patch(authenticate, updateCurrentUserProfile);

userRouter.route('/logout').post(authenticate, logCurrentUserOut);
userRouter.route('/cart').get(authenticate, getCart).post(authenticate, addToCart).patch(authenticate, removeFromCart);
userRouter.route('/favorite').get(authenticate, getFavorite).post(authenticate, addToFavorite).patch(authenticate, removeFromFavorite);
userRouter.route('/order').get(authenticate, getUserOrders).post(authenticate, createOrder);
userRouter.route('/order/:id').delete(authenticate, cancelOrder);

export default userRouter;
