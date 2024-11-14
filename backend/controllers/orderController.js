const Order = require("../models/orderModel")
// const Product = require("../models/productModel")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
//const APIFeatures = require('../utils/apiFeatures')
const sendToken = require("../utils/jwt")
const sendEmail = require("../utils/email")
const sendEmailUsingGmail = require('../utils/email')

const crypto = require('crypto');


//CREATE NEW ORDER http://127.0.0.1:8000/api/v1/order/new

exports.newOrder = catchAsyncError( async (req, res, next) => {
    
    let myOrderObj = req.body
    let addlPrice = 0;
    
        for (const property in myOrderObj.additionalCharges) {
            
            if(myOrderObj.additionalCharges[property].status){
                if(property == "midnightSurcharge"){
                    myOrderObj.additionalCharges[property].charges = 10;
                    addlPrice += 10;
                }
                if(property == "tuasSouthBoulevard"){
                    myOrderObj.additionalCharges[property].charges = 20;
                    addlPrice += 20;
                }
                if(property == "additionalStopAlongtheWay"){
                    myOrderObj.additionalCharges[property].charges = 10;
                    addlPrice += 10;
                }
                if(property == "additionalStopOutoftheWay"){
                    myOrderObj.additionalCharges[property].charges = 20;
                    addlPrice += 20;
                }   
            }
          }
    
    let fullAmount = myOrderObj.rate.serviceAmount + addlPrice;

    let serviceCharge = 0;

    if(myOrderObj.paymentMode == 'CARD_PAYMENT'){

        serviceCharge = (fullAmount * 4/100);
    }

    fullAmount = fullAmount + serviceCharge;

    myOrderObj.rate.totalAdditionalCharges = addlPrice;
    myOrderObj.rate.serviceCharges = serviceCharge;
    myOrderObj.rate.fullAmount = fullAmount;

    
    // const newOrder = new Order(myOrderObj)

    const order = await Order.create({
        ...myOrderObj
        // user : req.user.id
    })

    const message = `Your Booking is confirmed \n\n 
     \n\n Your booking details as follows: `

    try {

        sendEmailUsingGmail({
            email : myOrderObj.customerDetails.email,
            subject : 'MaxicabRide,  Your booking confirmed',
            message,
            myOrderObj
        })

        res.status(200).json({
            success : true,
            message : `Email sent to ${myOrderObj.customerDetails.email}`,
            order
        })
    
    } catch (error) {
        
        return next(new ErrorHandler(error.message, 500))
    }


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
    const orders = await Order.find({ user : req.user.id})

    // if(!order){
    //     return next(new ErrorHandler(`Order not found with this id : ${req.params.id}`, 404));
    // }

    res.status(200).json({
        success : true,
        count : orders.length,
        orders
    })
})

//ADMIN  - GET ALL ORDERS http://127.0.0.1:8000/api/v1/admin/orders

exports.orders = catchAsyncError( async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.rate.fullAmount
    })

    res.status(200).json({
        success : true,
        totalAmount,
        count : orders.length,
        orders
    })
})


//ADMIN  - UPDATE ORDER http://127.0.0.1:8000/api/v1/order/:id

exports.updateOrders = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    // if(order.orderStatus == 'FINISHED'){
    //     return next(new ErrorHandler(`Order has been already FINISHED`, 400));
    // }

    //updating  the product stock of each items
    // order.orderItems.forEach(async orderItem => {
    //     await updateStock(orderItem.product, orderItem.quantity)
    // })

    order.orderStatus = req.body.orderStatus;
    await order.save()

    res.status(200).json({
        success : true
    })
})

exports.cancelOrder = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id); 

    order.orderStatus = 'CANCELLED';
    await order.save()

    const message = `Your Booking is cancelled \n\n 
     \n\n Your booking details as follows: `

    try {

        sendEmail({
            email : req.user.email,
            subject : 'MaxicabRide Your booking has been cancelled',
            message,
        })

        res.status(200).json({
            success : true,
            message : `Email sent to ${req.user.email}`,
            order
        })
    
    } catch (error) {
        
        return next(new ErrorHandler(error.message, 500))
    }




})

// async function updateStock (productId, quantity) {
//     const product = await Product.findById(productId);
//     product.stock = product.stock - quantity;
//     product.save({validateBeforeSave : false})
// }

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
