import preventErr from '../utils/preventErr.js';
import AppError from '../utils/AppError.js';
import bcrypt from 'bcrypt';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// <------------------------profile------------------------------->
const getCurrentUserProfile = preventErr(async (req, res) => {
  res.status(200).json(req.user);
});
const updateCurrentUserProfile = preventErr(async (req, res) => {
  if (!req.body) {
    throw new AppError('Request body is required', 400, false);
  }
  const hashedPassword = req.body.password ? await bcrypt.hash(req.body.password, 10) : req.user.password;
  req.user.username = req.body.username || req.user.username;
  req.user.password = hashedPassword;
  req.user.email = req.body.email || req.user.email;
  if (req.body.address) {
    req.user.address = req.body.address;
  }
  if (req.body.phonenumber) {
    req.user.phonenumber = req.body.phonenumber;
  }
  await req.user.save();
  res.status(200).json({
    success: true,
    message: 'Updated',
    results: { ...req.user._doc, _id: null, password: null },
  });
});
const logCurrentUserOut = preventErr((req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 1,
  });
  res.status(200).json({
    success: true,
    message: 'Loged out',
  });
});

// <------------------------cart------------------------------->
const getCart = preventErr(async (req, res) => {
  const data = await req.user.populate('cart');
  res.status(200).json({ results: data.cart });
});
const addToCart = preventErr(async (req, res) => {
  if (!req.body) throw new AppError('Request body is required', 400, false);
  const { id } = req.body;
  const prod = await Product.findById(id);
  if (!prod) throw new AppError('Product not found', 404, false);
  const newCart = new Set([...req.user.cart.map(e => e.toString()), id]);
  req.user.cart = [...newCart];
  await req.user.save();
  res.status(200).json({ success: true, results: req.user.cart });
});
const removeFromCart = preventErr(async (req, res) => {
  if (!req.body) throw new AppError('Request body is required', 400, false);
  const { id } = req.body;
  req.user.cart = req.user.cart.filter(e => e.toString() !== id);
  await req.user.save();
  res.status(200).json({ success: true, results: req.user.cart });
});

// <------------------------favorite------------------------------->
const getFavorite = preventErr(async (req, res) => {
  const data = await req.user.populate('favorite');
  res.status(200).json({ results: data.favorite });
});
const addToFavorite = preventErr(async (req, res) => {
  if (!req.body) throw new AppError('Request body is required', 400, false);
  const { id } = req.body;
  const prod = await Product.findById(id);
  if (!prod) throw new AppError('Product not found', 404, false);
  const newFavorite = new Set([...req.user.favorite.map(e => e.toString()), id]);
  req.user.favorite = [...newFavorite];
  await req.user.save();
  res.status(200).json({ success: true, results: req.user.favorite });
});
const removeFromFavorite = preventErr(async (req, res) => {
  if (!req.body) throw new AppError('Request body is required', 400, false);
  const { id } = req.body;
  req.user.favorite = req.user.favorite.filter(e => e.toString() !== id);
  await req.user.save();
  res.status(200).json({ success: true, results: req.user.favorite });
});

// <------------------------order------------------------------->
const getUserOrders = preventErr(async (req, res) => {
  const results = await req.user.populate({
    path: 'ordered',
    populate: 'items.product',
  });
  res.json({ results: results.ordered });
});
const createOrder = preventErr(async (req, res) => {
  const user = req.user;
  const { items, phonenumber, shippingAddress, paymentMethod } = req.body;
  if (!items || !phonenumber || !shippingAddress || !paymentMethod) throw new AppError('Missing infomation, order failed', 400, false);

  // calculate amount
  const itemList = await Promise.all(items.map(i => Product.findById(i.product)));
  const quantityMap = {};
  items.forEach(i => (quantityMap[i.product] = i.quantity));
  let totalAmount = 0;
  itemList.forEach(i => (totalAmount += i.price * quantityMap[i._id]));

  // create order
  const order = Order({ user: user._id, items, phonenumber, shippingAddress, totalAmount });
  await order.save();

  // delete old items from cart and update user ordered
  user.cart = user.cart.filter(x => quantityMap[x.toString()] === undefined);
  user.ordered.push(order._id);
  await user.save();

  res.status(200).json({ success: true, order, cart: user.cart });
});
const cancelOrder = preventErr(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) throw new AppError('Order not found', 404, false);
  order.state = 'canceled';
  await order.save();
  res.status(200).json({ success: true, order });
});

export { getCurrentUserProfile, updateCurrentUserProfile, logCurrentUserOut, addToCart, addToFavorite, removeFromCart, removeFromFavorite, getCart, getFavorite, getUserOrders, createOrder, cancelOrder };
