const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    console.log("INSIDE isAuthenticatedUser")

    const { token } = req.cookies
    if(!token){

        return next(new ErrorHandler('Login first to handle this resource', 401))
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
    
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next();
    }
}