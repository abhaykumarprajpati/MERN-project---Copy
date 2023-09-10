// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
  subcategories: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    parentCategory: mongoose.Schema.Types.ObjectId,
  }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
