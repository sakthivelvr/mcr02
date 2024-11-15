const mongoose = require('mongoose')
const mongooseSequence = require('mongoose-sequence')

const orderSchema = new mongoose.Schema({

    title: {
        type : String,
        default : "BOOKING"
    },

    vehicleId: {
        type : String,
        required : [true, "please enter the Vehicle ID"],
    },

    serviceId: {
        type : String,
        required : [true, "please enter the service ID"],
    },

    

    category : {
        type : String,
        required : [true, "Please enter the vehicle category"],
        enum : {
            values : [
                "6_SEATER",
                '7_SEATER',
                '9_SEATER',
                '13_SEATER',
                '23_SEATER',
                '45_SEATER'
            ],
            message : "Please select correct category, for.eg, 13 SEATER"
        }
    },

    serviceName: {
        type : String,
        required : [true, "please enter the service Name"],
    },
    serviceSubName: {
        type : String,
        required : [true, "please enter the service sub Name"],
    },

    rate: {

        serviceAmount : {
            type : Number,
            required : [true, "please enter the amount"],
        },

        totalAdditionalCharges : {
            type : Number,
            required : [true, "please enter the full amount"],
        },

        serviceCharges : {
            type : Number,
            required : [true, "please enter the Service charges"],
        },

        fullAmount : {
            type : Number,
            required : [true, "please enter the full amount"],
        }

    },

    bookingPlatform : {
        type : String,
        required : [true, "Please enter the booking platform"],
        enum : {
            values : [
                "WEB",
                'MOBILE_APP',
                'OTHERS'
            ],
            message : "Please select correct Booking platform, for.eg, WEB"
        }
    },

    customerDetails : {
        name: {
            type : String,
            required : [true, "please enter the Customer Name"],
        },
        email: {
            type : String,
            required : [true, "please enter the Customer Email"],
        },
        phone: {
            type : String,
            required : [true, "please enter the Customer Phone number"],
        },
        
        message : {
            type : String,
            required : false,
        }
    },
    
    pickupDate : {
        type: Date,
        required : [true, "please enter the pickup Date"],
    },

    pickupTime : {
        type: String,
        required : [true, "please enter the pickup Time"],
    },
    pickupAddress : {
        type : String,
        required : [true, "please enter the pick-up address"],

    },

    dropoffAddress : {
        type : String,
        required : [true, "please enter the drop-off address"],

    },
    

    noOfPax : {
        type: Number,
        required: true
    },

    noOfLuggage : {
        type: Number,
        required: true
    },

    additionalCharges : {
        midnightSurcharge : {
            status : {
                type: Boolean,
                default : false
            },
            charges : {
                type: Number,
                default : 0
            },
        },
        tuasSouthBoulevard : {
            status : {
                type: Boolean,
                default : false
            },
            charges : {
                type: Number,
                default : 0
            },
        },
        additionalStopAlongtheWay : {
            status : {
                type: Boolean,
                default : false
            },
            charges : {
                type: Number,
                default : 0
            },
        },
        additionalStopOutoftheWay : {
            status : {
                type: Boolean,
                default : false
            },
            charges : {
                type: Number,
                default : 0
            },
        }
    },

        
       
        

        paymentDetails : {
            paymentMode : {
                type : String,
                required : [true, "Please enter the Payment mode"],
                enum : {
                    values : [
                        "CARD_PAYMENT",
                        "PAYNOW_QR",
                        "CASH_PAYMENT"
                    ],
                    message : "Please enter the coorect Payment mode, e.g., CARD_PAYMENT"
                }
            },

            paymentStatus : {
                type : String,
                required : [true, "Please enter the Payment Status"],
                enum : {
                    values : [
                        "PENDING",
                        "PAID"
                    ],
                    message : "Please enter the coorect Payment status, e.g., PAID"
                }
            },

            paidAt : {
                type: String,
            },

            paymentTxnId: {
                type: String,
            }

        },
        vehicleName: {
            type : String,
            required: true
        },
        
        orderStatus : {
            type : String,
            required : [true, "Please enter the Order status"],
            enum : {
                values : [
                    "PENDING",
                    'FINISHED',
                    'CANCELLED'
                ],
                message : "Please enter the coorect Order status, e.g., FINISHED"
            }
        },
    

    user : {
        type : mongoose.SchemaTypes.ObjectId,
        required : false,
        ref : 'User'
    },
    
    


    
},{timestamps : true})


// module.exports = schema


orderSchema.plugin(mongooseSequence(mongoose), { inc_field: 'orderNo' });

// export default mongoose.model("Order", orderSchema);


let schema = mongoose.model('Order', orderSchema)

module.exports = schema



