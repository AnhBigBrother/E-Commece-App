import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import errHandler from './middlewares/errHandler.js';

import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';
import productRouter from './routes/productRouter.js';

// setup
dotenv.config();
const port = process.env.PORT;
const app = express();

// cors
const whitelist = ['http://localhost:5173', 'e-commece-bigbruhh.vercel.app'];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log('----------');
  console.log('Domain:', req.get('origin'));
  console.log('PATH  :', req.path);
  console.log('METHOD:', req.method);
  console.log('----------');
  next();
});

// connect DB, start server
mongoose
  .connect(process.env.DB_URI, console.log('Connected to DB successfuly!'))
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch(error => {
    console.error(`ERROR: ${error}`);
    process.exit(1);
  });

// route
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);

// handle error
app.use(errHandler);
