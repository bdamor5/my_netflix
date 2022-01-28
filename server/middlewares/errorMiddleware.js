const ErrorHandler = require('../utils/errorHandler');

const errormiddleware = (err,req,res,next) =>{
    var statusCode = err.statusCode || 500;
    var message = err.message || "Internal Server Error";

    if(err.name === "CastError"){
        message = `Resource Not Found.Invalid : ${err.path}`;
        err = new ErrorHandler(message,404);
    }

    res.status(statusCode).json({
        success : false,
        message,
        error : err.stack
    })
}

module.exports = errormiddleware

