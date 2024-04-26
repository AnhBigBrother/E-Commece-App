import mongoose from 'mongoose';

const statisticSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'orders',
    },
  ],
  revenues: {
    type: Number,
    required: true,
    default: 0,
  },
  newUsers: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Statistic = mongoose.model('statistics', statisticSchema);

export default Statistic;
