const ErrorHandler = require("../utils/errorHandler");

exports.admin = (req,res,next) => {
        if(req.user.isAdmin)
            next();
        else
            return next(new ErrorHandler('This User is not authorized to access this resource',403))       
}   