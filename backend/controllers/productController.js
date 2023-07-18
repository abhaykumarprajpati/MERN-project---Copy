const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary") // this is used here when creating admin panel












// Create Product --Admin
//catchAsyncErrors is ease to use instead try and catch 
//now if we dont post name or any other field, it shows us success: false and message: please enter name
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    //done when creating admin panel

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })

    }
    req.body.images = imagesLink;






    //done earlier
    req.body.user = req.user.id;

    const product = await Product.create(req.body);// user sends data , so that product will create
    console.log("this is product category", product.category)

    res.status(201).json({
        success: true,
        product
    });
});


// Read Product or find() or Get all products

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)



    let products = await apiFeature.query;

    let filteredProductsCount = products.length;



    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});











//  Get all products -- Admin

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({

        success: true,
        products,

    })

}
)















//Get product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {


    const product = await Product.findById(req.params.id);

    // if (!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product not found"
    //     })
    // } 
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product,

    })


})


// Update product  --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // this is done when admin update product image from new image
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting images from Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);

        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            })


        }
        req.body.images = imagesLinks;
    }



    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    })
    res.status(200).json({
        success: true,
        message: "Product Update Successfully",
        product
    })
}
)
//Delete Product 
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    //Deleting Images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);

    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Delete Successfully"
    })
})

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    //now we find the product for which review created

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })

    }
    else {
        product.reviews.push(review)
        
        product.numofReviews = product.reviews.length
    }
    // 4, 5,5,2 =16/4=4
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg = avg + rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,

    })

});

// Get All Reviews of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    console.log("this is product", product)



    if (!product) {

        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete Reviews

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));

    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    // 4, 5,5,2 =16/4=4
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }
    const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numofReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})