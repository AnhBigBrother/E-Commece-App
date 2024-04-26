import User from '../models/userModel.js';
import Statistic from '../models/statisticModel.js';
import preventErr from '../utils/preventErr.js';
import AppError from '../utils/AppError.js';
import createToken from '../utils/createToken.js';
import bcrypt from 'bcrypt';

const createUser = preventErr(async (req, res) => {
  const { username, email, password } = req.body;
  await User.checkValid(username, email, password);
  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError('User already exists', 400, false);
  }

  const date = new Date();
  const time = date.toLocaleString('default', { month: 'short', year: 'numeric' });
  const month = await Statistic.findOne({ time });
  if (!month) {
    const newStatis = await Statistic({ time, newUsers: 1 });
    await newStatis.save();
  } else {
    month.newUsers = month.newUsers + 1;
    await month.save();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  createToken(res, newUser._id);
  res.status(201).json({
    success: true,
    message: 'User has been created',
    results: { ...newUser._doc, _id: null, password: null },
  });
});

const loginUser = preventErr(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (!userFound) {
    throw new AppError('User did not exist', 404, false);
  }
  const isPasswordValid = await bcrypt.compare(password, userFound.password);
  if (isPasswordValid) {
    createToken(res, userFound._id);
    res.status(202).json({
      success: true,
      message: 'Loged in',
      results: { ...userFound._doc, _id: null, password: null },
    });
  } else {
    throw new AppError('Wrong password', 406, false);
  }
});

export { loginUser, createUser };
