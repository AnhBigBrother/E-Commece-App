import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    address: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    cart: { type: Array, default: [] },
    favorite: { type: Array, default: [] },
    ordered: { type: Array, default: [] },
  },
  { timestamps: true }
);

userSchema.statics.checkValid = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new AppError("Missing some user information", 400, false);
  }
};

const User = mongoose.model("users", userSchema);

export default User;
