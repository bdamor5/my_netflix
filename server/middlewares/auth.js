const asyncHandler = require('../middlewares/asyncErrorMiddleware')
const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const auth = asyncHandler(async(req,res,next)=>{
    const logintoken = req.cookies.loginToken;

    const user = jwt.verify(logintoken,process.env.SECRET)

    if(!user)
        return next(new ErrorHandler("User Not Authorized",401))

    req.user = await User.findById(user.id);

    next();
})

module.exports = auth