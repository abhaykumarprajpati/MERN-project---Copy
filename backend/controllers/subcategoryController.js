const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const Subcategory = require("../models/subCategoryModel")


exports.createSubCategory = catchAsyncErrors(async (req, res) => {
    const user = req.user.id;
    const checkSub = await Subcategory.find({ category_id: req.body.category_id })

    if (checkSub.length > 0) {

        let checking = false;
        for (let i = 0; i < checkSub.length; i++) {
            if (checkSub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase()) {
                checking = true;
                break;

            }
        }

        if (checking == false) {
            const subcategory = await Subcategory.create({
                category_id: req.body.category_id,
                sub_category: req.body.sub_category,
                user: user

            })
            res.status(201).json({
                success: true,
                message: "Subcategory created successfully",
                data: subcategory
            });
        } else {
            res.status(409).json({
                success: true,
                message: `this subcategory (${req.body.sub_category}) already exists`,

            });
        }

    } else {
        const subcategory = await Subcategory.create({
            category_id: req.body.category_id,
            sub_category: req.body.sub_category,
            user: user
        })
        res.status(201).json({
            success: true,
            message: "Subcategory created successfully",
            data: subcategory
        });
    }






});

// Get subcategories based on parent category id

exports.getSubcategories = catchAsyncErrors(async (req,res) => {

    const getsubcategories = await Subcategory.find({ category_id: req.params.category_id })

    res.status(200).json({
        success: true,
        message: " successfully Fetched subcategories based on parent id ",
        data: getsubcategories
    });
}

)
