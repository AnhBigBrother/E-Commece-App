import mongoose from 'mongoose';

const statisticalSchema = new mongoose.Schema({});

const Statistical = mongoose.model('statisticals', statisticalSchema);

export default Statistical;
