

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    console.log("test_abhay");
    
    const { token } = req.cookies;
    console.log('test_tokenCookiesafter', token);
    
    // if (!token) {
    //     return next(new ErrorHandler("Please Login to access this resource", 401))
    // }
    if (token=="null") {
        return next(new ErrorHandler("Please Login to access this resource", 401))
    }
    console.log("test_checking2");
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id); //till user logged in we can access user data from req.user , then we call next fuction
    next();


});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) { //checking that role is user or admin 
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`, 403 // 403 means server understand  what to do but refuse to do
                )
            )
        }
        next();
    }
}
