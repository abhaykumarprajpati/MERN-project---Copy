
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Subcategory = require("../models/subCategoryModel")
const Category = require('../models/categoryModel'); // Import your category model

// Create a new category
exports.createCategory = catchAsyncErrors(async (req, res) => {

    const { name } = req.body;
    const user = req.user.id;
    const category = new Category({ name, user });
    await category.save();
    res.status(201).json(category);

});




// Retrieve all categories
exports.getAllCategories = catchAsyncErrors(async (req, res) => {

    const categories = await Category.find();
    res.json(categories);

});

exports.getAllSubcategories = catchAsyncErrors(async (req, res) => {
    const subCategories = await Subcategory.find()
    res.status(200).json(subCategories)
})

exports.deletecategory = catchAsyncErrors(async (req, res, next) => {
    console.log('checking id for deleteSubcategory', req.params.id);
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully' });


})


exports.updatecategory = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    const user = req.user.id;
    // Use findByIdAndUpdate to update the category by its ID
    const updatedCategory = await Category.findByIdAndUpdate(id, { name,user }, { new: true });

    if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
        message: 'Updated successfully',
        updatedCategory,
    });
});
// Update a category (e.g., to add or remove subcategories)
// exports.updateCategory = catchAsyncErrors(async (req, res) => {

//     const { subcategories } = req.body;
//     const category = await Category.findByIdAndUpdate(
//         req.params.categoryId,
//         { subcategories },
//         { new: true }
//     );
//     res.json(category);

// });


