const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;