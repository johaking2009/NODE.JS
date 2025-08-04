const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  subcategory: { type: String },
  category: { type: String },
  unit: { type: String },
  unit_description: { type: String },
  price: { type: Number },
  expiration: { type: Number },
  additionals: [{ type: String }],
  image_url: { type: String },
  product_description: { type: String },
  product_ingredients: { type: String },
  nutritional_value: {
    kkal: { type: Number },
    fat: { type: Number },
    protein: { type: Number },
    uglevod: { type: Number }
  },
  strg_conditions: { type: String },
  section: { type: String }
});

module.exports = mongoose.model('Product', productSchema);