import express from "express";
import { loginUser, createUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/login").post(loginUser);
authRouter.route("/signup").post(createUser);

export default authRouter;
