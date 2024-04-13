import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  logCurrentUserOut,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(authenticate, getCurrentUserProfile)
  .patch(authenticate, updateCurrentUserProfile);

userRouter.route("/logout").post(authenticate, logCurrentUserOut);

export default userRouter;
