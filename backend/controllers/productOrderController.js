const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
//const APIFeatures = require('../utils/apiFeatures')
const sendToken = require("../utils/jwt")
const sendEmail = require("../utils/email")
const crypto = require('crypto');


//CREATE NEW ORDER http://127.0.0.1:8000/api/v1/order/new

exports.newOrder = catchAsyncError( async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt : Date.now(),
        user : req.user.id
    })
    res.status(200).json({
        success : true,
        order
    })
})


//GET SINGLE ORDER http://127.0.0.1:8000/api/v1/order/:id

exports.getSingleOrder = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new ErrorHandler(`Order not found with this id : ${req.params.id}`, 404));
    }

    res.status(200).json({
        success : true,
        order
    })
})

//GET MY ORDERS http://127.0.0.1:8000/api/v1/myorder/

exports.myOrders = catchAsyncError( async (req, res, next) => {
    const order = await Order.find({ user : req.user.id})

    // if(!order){
    //     return next(new ErrorHandler(`Order not found with this id : ${req.params.id}`, 404));
    // }

    res.status(200).json({
        success : true,
        order
    })
})

//ADMIN  - GET ALL ORDERS http://127.0.0.1:8000/api/v1/admin/orders

exports.orders = catchAsyncError( async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success : true,
        totalAmount,
        orders
    })
})


//ADMIN  - UPDATE ORDER http://127.0.0.1:8000/api/v1/order/:id

exports.updateOrders = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered'){
        return next(new ErrorHandler(`Order has been already delivered`, 400));
    }

    //updating  the product stock of each items
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save()

    res.status(200).json({
        success : true
    })
})

async function updateStock (productId, quantity) {
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave : false})

}

//ADMIN  - DELETE ORDER http://127.0.0.1:8000/api/v1/order/:id

exports.deleteOrder = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order not found with this id ${req.params.id}`, 400));
    }

    await order.deleteOne();
    
    res.status(200).json({
        success : true 
    })
})
