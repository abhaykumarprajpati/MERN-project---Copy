// controllers/categoryController.js
// const Category = require('../models/Category');
const Category = require('../models/categoryModel')
// const Subcategory = require('../models/Subcategory');
const Subcategory = require('../models/subCategoryModel');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category' });
    }
};

exports.createSubcategory = async (req, res) => {
    try {
        const { name, parentCategory } = req.body;
        const subcategory = new Subcategory({ name, parentCategory });
        await subcategory.save();
        console.log('subcategory data', subcategory)

        // Update parent category's subcategories array
        const category = await Category.findById(parentCategory);
        category.subcategories.push(subcategory); // Push the whole subcategory object
        await category.save();

        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating subcategory' });
    }
};

