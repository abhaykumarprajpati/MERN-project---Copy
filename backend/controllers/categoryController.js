
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

// Create a subcategory within a category


exports.deleteSubcategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.query.categoryId)


    if (!category) {
        return next(new ErrorHandler("Category not found", 404))
    }

    const subcategories = category.subcategories.filter(rev => rev._id.toString() !== req.query.id.toString())
    await Category.findByIdAndUpdate(req.query.categoryId, {
        subcategories
    },

        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )
    res.status(200).json({
        success: true,
    })

})

// Retrieve all categories
exports.getAllCategories = catchAsyncErrors(async (req, res) => {

    const categories = await Category.find();
    res.json(categories);

});

// Update a category (e.g., to add or remove subcategories)
exports.updateCategory = catchAsyncErrors(async (req, res) => {

    const { subcategories } = req.body;
    const category = await Category.findByIdAndUpdate(
        req.params.categoryId,
        { subcategories },
        { new: true }
    );
    res.json(category);

});


