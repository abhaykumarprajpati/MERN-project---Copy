const ErrorHandler = require("../utils/errorhandler")


// module.exports = (err, req, res, next) => {

//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";



//     // Wrong Mongodb Id error
//     if (err.name === "CastError") {
//         const message = `Resource not found. Invalid: ${err.path}`;
//         err = new ErrorHandler(message, 400);
//     }
//     //Mongoose duplicate key error
//     if (err.code === 11000) {
//         const message = ` Duplicate ${Object.keys(err.keyValue)} Entered`;
//         err = new ErrorHandler(message, 400);
//     }

//     //wrong JWT error
//     if (err.name === "JsonWebTokenError") {
//         const message = ` Json Web Token is invalid, try again`;
//         err = new ErrorHandler(message, 400);
//     }

//     //JWT expire error
//     if (err.name === "TokenExpiredError") {
//         const message = ` Json web Token is Expired , try again`;
//         err = new ErrorHandler(message, 400);
//     }



//     res.status(err.statusCode).json({
//         success: false,
//         message: err.message
//     });
// };


//same code using switch cases



module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  switch (err.name) {
    case "CastError":
      const message = `Resource not found. Invalid: ${err.path}`;
      err = new ErrorHandler(message, 400);
      break;

    case 11000:
      const duplicateMessage = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(duplicateMessage, 400);
      break;

    case "JsonWebTokenError":
      const jwtErrorMessage = "Json Web Token is invalid, try again";
      err = new ErrorHandler(jwtErrorMessage, 400);
      break;

    case "TokenExpiredError":
      const jwtExpiredMessage = "Json web Token is Expired, try again";
      err = new ErrorHandler(jwtExpiredMessage, 400);
      break;

    default:
      break;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
