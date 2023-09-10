const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Return order 

exports.returnProduct = catchAsyncErrors(async (req, res, next) => {


    const { productId, reason, returnDate } = req.body;
    console.log(productId, reason, returnDate)

    // Validate input data
    if (!productId || !reason || !returnDate) {
        return res.status(400).json({ error: 'Missing required data' });
    }
    // const product = await Product.findOneAndUpdate(
    //     { _id: productId },
    //     { $set: { returned: true } }
    // );

    // // Create return transaction record
    // const returnTransaction = new Return({
    //     product: productId,
    //     reason,
    //     returnDate
    // });
    // await returnTransaction.save();

    // Send success response
    res.status(200).json({
        success: true,
        message: "product return successfully"

    });



    // const product = await Product.findById(req.params.id); // we get product

    // product.Stock = product.Stock + quantity;

    // await product.save({ validateBeforeSave: false })




})





//Create new Order  // it is imp that user should logged in
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;



    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


// Get single order // logged in user can access their order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    console.log('Get single order **********************', order)
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
}
)



//Get logged in user order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });
});


//Get All Orders  --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();


    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount = totalAmount + order.totalPrice;
    })


    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});
//Update Order Status  --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);  // we get the order

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {

        order.orderItems.forEach(async (o) => {

            await updateStock(o.product, o.quantity);

        });
    }

    order.orderStatus = req.body.status;

    // order.deliveredAt= Date.now()  // what if we pass shipped instead of delivered, so we make condition


    if (req.body.status === "Delivered") {

        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,

    });
});

async function updateStock(id, quantity) {


    const product = await Product.findById(id); // we get product

    product.Stock = product.Stock - quantity;

    await product.save({ validateBeforeSave: false })

}






// Delete Orders --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    console.log(order)

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});