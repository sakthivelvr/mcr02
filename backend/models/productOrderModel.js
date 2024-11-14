const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo : {
        address : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        }, 
        city : {
            type : String,
            required : true
        },
        phoneNo : {
            type : String,
            required : true
        },   
        postalCode : {
            type : String,
            required : true
        }, 
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : 'User'
    },
    orderItems : [{
        name : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        image : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        product : {
            type : mongoose.SchemaTypes.ObjectId,
            required : true,
            ref : 'Product'
        }
    }],
    itemsPrice : {
        type : Number,
        default : 0.0
    },
    taxPrice : {
        type : Number,
        default : 0.0
    },
    shippingPrice : {
        type : Number,
        default : 0.0
    },
    totalPrice : {
        type : Number,
        default : 0.0
    },
    paidAt : {
        type: Date,
    },
    deliveredAt : {
        type: Date,
    },
    orderStatus : {
        type: String,
        default : 'Processing'
    },


    
},{timestamps : true})


let schema = mongoose.model('Order', orderSchema)
module.exports = schema


