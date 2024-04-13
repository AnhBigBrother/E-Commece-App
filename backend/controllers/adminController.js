import preventErr from "../utils/preventErr.js";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import AppError from "../utils/AppError.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";

const shoppunk = initializeApp(firebaseConfig);
const storage = getStorage(shoppunk);

const getAllCategories = preventErr(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ results: categories });
});
const getAllBrands = preventErr(async (req, res) => {
  const products = await Product.find().select("brand");
  let results = products.map(e => e.brand);
  results = [...new Set(results)];
  res.status(200).json({ success: true, results });
});

const createCategory = preventErr(async (req, res) => {
  if (!req.body?.name) {
    throw new AppError("Invalid category object", 400, false);
  }
  const categoryFound = await Category.findOne({ name: req.body.name });
  if (categoryFound) {
    throw new AppError("Category has been existed", 400, false);
  }
  const newCategory = Category({ name: req.body.name });
  await newCategory.save();
  res.status(201).json({
    message: "Category created",
    success: true,
    results: newCategory._doc,
  });
});

const uploadProduct = preventErr(async (req, res) => {
  if (!req.file || !req.file.buffer || !req.body) {
    throw new AppError("Invalid request", 400, false);
  }
  if (req.file.size > 3145728) {
    throw new AppError("Size of image must be less than 3MB", 413, false);
  }
  const { name, price, brand, quantity, categories, description } = req.body;
  if (!name || !price || !brand || !quantity || !categories || !description) {
    throw new AppError("Missing information", 400, false);
  }
  const storageRef = ref(
    storage,
    `productImages/${req.file.originalname.split(" ").join("-")}`
  );
  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, {
    contentType: req.file.mimetype,
  });
  const imageUrl = await getDownloadURL(snapshot.ref);
  const newProduct = Product({
    name,
    price,
    brand,
    quantity,
    categories: categories.split(","),
    description,
    imageUrl,
  });
  await newProduct.save();
  res.status(201).json({ success: true, results: newProduct._doc });
});

const getAllProduct = preventErr(async (req, res) => {
  const { page } = req.query || 0;
  const productReturn = await Product.find()
    .skip(20 * page)
    .limit(20);
  res.status(200).json({ success: true, results: productReturn });
});
const getProductById = preventErr(async (req, res) => {
  const { id } = req.params;
  const results = await Product.findById(id);
  if (!results) {
    throw new AppError("Product not found", 404, false);
  }
  res.status(200).json({
    success: true,
    results,
  });
});
const updateProductById = preventErr(async (req, res) => {
  const { id } = req.params;
  const { name, price, brand, quantity, categories, description } = req.body;
  const prod = await Product.findById(id);
  if (!prod) {
    throw new AppError("Product not found", 404, false);
  }
  if (name) prod.name = name;
  if (price) prod.price = price;
  if (brand) prod.brand = brand;
  if (quantity) prod.quantity = quantity;
  if (categories) prod.categories = categories.split(",");
  if (description) prod.description = description;
  if (req.file) {
    if (req.file.size > 3145728) {
      throw new AppError("Size of image must be less than 3MB", 413, false);
    }
    const oldImgPath = prod.imageUrl.split("/");
    let oldImgUrl = oldImgPath[oldImgPath.length - 1].split("?")[0];
    oldImgUrl = oldImgUrl.slice(16);
    oldImgUrl = `productImages/${oldImgUrl}`;
    const oldImgRef = ref(storage, oldImgUrl);
    const newImgRef = ref(
      storage,
      `productImages/${req.file.originalname.split(" ").join("-")}`
    );
    const deleteOldImg = deleteObject(oldImgRef);
    const createNewImg = uploadBytesResumable(newImgRef, req.file.buffer, {
      contentType: req.file.mimetype,
    });
    const [snapshot] = await Promise.all([createNewImg, deleteOldImg]);
    const newImageUrl = await getDownloadURL(snapshot.ref);
    prod.imageUrl = newImageUrl;
  }
  await prod.save();
  res.status(200).json({ success: true, results: prod._doc });
});
const removeProductById = preventErr(async (req, res) => {
  const { id } = req.params;
  const prod = await Product.findById(id);
  if (!prod) {
    throw new AppError("Product not found", 404, false);
  }
  const oldImgPath = prod.imageUrl.split("/");
  let oldImgUrl = oldImgPath[oldImgPath.length - 1].split("?")[0];
  oldImgUrl = oldImgUrl.slice(16);
  oldImgUrl = `productImages/${oldImgUrl}`;
  const oldImgRef = ref(storage, oldImgUrl);
  const deleteImg = deleteObject(oldImgRef);
  const deleteProduct = prod.deleteOne();
  await Promise.all([deleteImg, deleteProduct]);
  res.status(200).json({ success: true, message: "Product deleted" });
});

const getAllUser = preventErr(async (req, res) => {
  const { page } = req.query || 0;
  const usersReturn = await User.find()
    .skip(20 * page)
    .limit(20);
  res.status(200).json({ success: true, results: usersReturn });
});
const updateUserInfo = preventErr(async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw new AppError("Request body is required");
  }
  const theUser = await User.findById(id);
  if (!theUser) {
    throw new AppError("User not found", 404, false);
  }
  if (theUser.isAdmin) {
    throw new AppError("Cannot change admin user");
  }
  theUser.username = req.body.username;
  await theUser.save();
  res.status(200).json({ message: "Update user successfuly", success: true });
});
const getUserInfo = preventErr(async (req, res) => {});
const deleteUser = preventErr(async (req, res) => {
  const { id } = req.params;
  const theUser = await User.findById(id);
  await theUser.deleteOne();
  if (theUser.isAdmin) {
    throw new AppError("Cannot delete admin user");
  }
  res.status(200).json({ message: "Delete user successfuly", success: true });
});

export {
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
};
