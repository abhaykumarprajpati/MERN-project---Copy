const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const Subcategory = require("../models/subCategoryModel")


exports.createSubCategory = catchAsyncErrors(async (req, res) => {
    const user = req.user.id;
    const subcategory = await Subcategory.create({
        parentCategoryId: req.body.parentCategoryId,
        name: req.body.name,
        user: user
    })
    res.status(201).json({
        success: true,
        message: "Subcategory created successfully",
        data: subcategory
    });

});



exports.deleteSubcategory = catchAsyncErrors(async (req, res, next) => {
    console.log('checking id for deleteSubcategory', req.params.id);
    const id = req.params.id;
    await Subcategory.findByIdAndDelete(id);
    res.json({ message: 'SubCategory deleted successfully' });


})

// Get subcategories based on parent category id

exports.getSubcategories = catchAsyncErrors(async (req, res) => {

    const getsubcategories = await Subcategory.find({ category_id: req.params.category_id })

    res.status(200).json({
        success: true,
        message: " successfully Fetched subcategories based on parent id ",
        data: getsubcategories
    });
}

)


exports.updateSubcategory = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    const user = req.user.id;
    // Use findByIdAndUpdate to update the category by its ID
    const updatedCategory = await Subcategory.findByIdAndUpdate(id, { name, user }, { new: true });

    if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
        message: 'Updated successfully',
        updatedCategory,
    });
});
