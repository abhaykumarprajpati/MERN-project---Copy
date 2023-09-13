const mongoose = require('mongoose');
const Subcategory = require('./subCategoryModel')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },


  // subcategories: [
  //   {

  //     name: {
  //       type: String,
  //       required: true,
  //     }
  //   },
  // ]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
