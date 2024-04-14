import preventErr from "../utils/preventErr.js";
import Product from "../models/productModel.js";
import AppErr from "../utils/AppError.js";

const filterProduct = preventErr(async (req, res) => {
  const page = req.query.page || 0;
  const sort = req.query.sort || "all";
  const categories = req.query.categories;
  const brand = req.query.brand;
  const filter = {};
  const order = {};
  if (categories) {
    filter.categories = { $in: categories.split(",") };
    console.log(categories.split(","));
  }
  if (brand) {
    filter.brand = brand;
    console.log(filter);
  }
  if (sort) {
    if (sort === "price") {
      order.price = 1;
    }
    if (sort === "hot") {
      order.sold = -1;
    }
    if (sort === "new") {
      order.createdAt = -1;
    }
  }
  const results = await Product.find(filter)
    .sort(order)
    .skip(20 * page)
    .limit(20);
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
