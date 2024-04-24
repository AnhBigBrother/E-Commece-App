import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import preventErr from '../utils/preventErr.js';
import AppError from '../utils/AppError.js';

dotenv.config();

const authenticate = preventErr(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    throw new AppError('Request failed, you have to login', 401, false);
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userFound = await User.findById(decodedToken.userId);
  if (!userFound) {
    res.cookie('token', '', { maxAge: 1 });
    throw new AppError('User not found, authenticate failed', 404, false);
  }
  req.user = userFound;
  next();
});

const authorizeAdmin = preventErr((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    throw new AppError('Not authorize as admin', 401, false);
  }
  next();
});

export { authenticate, authorizeAdmin };
