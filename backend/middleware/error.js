const ErrorHandler = require("../utils/errorhandler")


module.exports = (err, req, res, next) => {
console.log('error page called')
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    console.log('casterror5',err.message);
    console.log('casterror6',err.statusCode);



    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        console.log('casterror1')
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
        console.log('casterror7');
    }
    //Mongoose duplicate key error
    if (err.code === 11000) {
        const message = ` Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong JWT error
    if (err.name === "JsonWebTokenError") {
       
        const message = ` Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
       
    }

    //JWT expire error
    if (err.name === "TokenExpiredError") {
        const message = ` Json web Token is Expired , try again`;
        err = new ErrorHandler(message, 400);
    }


    console.log('casterror3');
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
    console.log('casterror4');
};


//same code using switch cases



// module.exports = (err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";
//     console.log("test_errorsbackend",err.name);
//     switch (err) {
//         case (err.name === "CastError"):
//             const message = `Resource not found. Invalid: ${err.path}`;
//             err = new ErrorHandler(message, 400);
//             break;

//         case (err.code === 11000):
//             const duplicateMessage = `Duplicate ${Object.keys(err.keyValue)} Entered`;
//             err = new ErrorHandler(duplicateMessage, 400);
//             break;

//         case (err.name === "JsonWebTokenError"):
//             console.log('test_jsonwebtokenisinvalid');
//             const jwtErrorMessage = "Json Web Token is invalid, try again";
//             console.log("test_err",err)
//             err = new ErrorHandler(jwtErrorMessage, 400);
            
//             break;

//         case (err.name === "TokenExpiredError"):
//             const jwtExpiredMessage = "Json web Token is Expired, try again";
//             err = new ErrorHandler(jwtExpiredMessage, 400);
//             break;

//         default:
//             break;
//     }

//     console.log('test_finalmessage from errorpage',err.message);

//     res.status(err.statusCode).json({
//         success: false,
//         message: err.message,
//     });
// };
