// models/Subcategory.js
const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  category_id: {
    type: String,
    required: true
  },
  sub_category: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
