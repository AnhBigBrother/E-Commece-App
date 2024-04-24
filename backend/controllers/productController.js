import preventErr from '../utils/preventErr.js';
import Product from '../models/productModel.js';
import AppErr from '../utils/AppError.js';

const filterProduct = preventErr(async (req, res) => {
  const page = req.query.page || 0;
  const sort = req.query.sort || 'all';
  const categories = req.query.categories;
  const brand = req.query.brand;
  const search = req.query.search;
  const filter = {};
  const order = {};
  if (categories) {
    filter.category = { $in: categories.split(',') };
  }
  if (brand) {
    filter.brand = brand;
  }
  if (sort) {
    if (sort === 'price') {
      order.price = 1;
    }
    if (sort === 'hot') {
      order.sold = -1;
    }
    if (sort === 'new') {
      order.createdAt = -1;
    }
  }
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  const results = await Product.find(filter)
    .sort(order)
    .skip(6 * page)
    .limit(6);
  res.status(200).json({ success: true, results });
});

const getProductById = preventErr(async (req, res) => {
  const { id } = req.params;
  const results = await Product.findById(id);
  if (!results) {
    throw new AppErr('Product not found!');
  }
  res.json({ success: true, results });
});
const addProductReview = preventErr(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  if (!id) throw new AppErr('Missing product id', 400, false);
  if (!rating || !comment) throw new AppErr('Both rating and comment is required', 400, false);
  const prod = await Product.findById(id);
  if (!prod) throw new AppErr('Product not found', 404, false);
  for (let r of prod.reviews) {
    if (r.user.id === req.user._id.toString()) throw new AppErr('You has reviewed before', 400, false);
  }
  prod.reviews.push({ rating, comment, user: { id: req.user._id, name: req.user.username } });
  prod.rating = Math.round(((prod.rating + rating) / prod.reviews.length) * 10) / 10;
  prod.numReviews = prod.reviews.length;
  await prod.save();
  res.status(200).json(prod.reviews[prod.reviews.length - 1]);
});

export { getProductById, addProductReview, filterProduct };
