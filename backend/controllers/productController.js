import preventErr from "../utils/preventErr.js";
import Product from "../models/productModel.js";
import AppErr from "../utils/AppError.js";

const filterProduct = preventErr(async (req, res) => {
  const page = req.query.page || 0;
  const type = req.query.type || "all";
  let results;
  if (type === "all") {
    results = await Product.find()
      .skip(20 * page)
      .limit(20);
  }
  if (type === "special") {
    results = await Product.find({ categories: { $all: ["Special"] } })
      .skip(20 * page)
      .limit(20);
  }
  if (type === "hot") {
    results = await Product.find()
      .sort({ sold: -1 })
      .skip(20 * page)
      .limit(20);
  }
  if (type === "new") {
    results = await Product.find()
      .sort({ updatedAt: -1 })
      .skip(20 * page)
      .limit(20);
  }
  res.status(200).json({ success: true, results });
});

const getProductById = preventErr(async (req, res) => {
  const { id } = req.params;
  const results = await Product.findById(id);
  if (!results) {
    throw new AppErr("Product not found!");
  }
  res.json({ success: true, results });
});
const addProductReview = preventErr(async (req, res) => {});

export { getProductById, addProductReview, filterProduct };
