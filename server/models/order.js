const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      price: Number
    }
  ],
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  total: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: false
  },
  discount: {
    type: Number,
    default: 0
  },
  shippingFee: {
    type: Number,
    default: 40,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  deliveryDate: {
    type: Date,
    default: null
  },
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: {
    type: String,
    default: ''
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;