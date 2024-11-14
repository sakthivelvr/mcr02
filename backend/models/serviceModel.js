const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    title: {
        type : String,
        required : [true, "Please enter the Service name"],
        trim : true,
        maxLength : [70, "Service name cannot exceed 60 characters"]
    },

    price: {
        type : Number,
        required : [true, "Please enter the Price for the service"],
    },

    currency: {
        type : String,
        default : "SGD"
    },

    label: {
        type : String,
        required : [true, "Please enter the label for the service"],
    },
    
    desc: {
        type : String,
        required : [true, "Please enter the description for the service"],
    },

    vehicleId: {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, "Please enter the vehicle ID for the service"],
    },     

    vehicleCategory : {
        type : String,
        required : [true, "Please enter the vehicle category"],
        enum : {
            values : [
                "6_SEATER",
                '7_SEATER',
                '9_SEATER',
                '13_SEATER',
                '23_SEATER',
                '40/45_SEATER'
            ],
            message : "Please select correct category, for.eg, 13 SEATER"
        }
    },

    serviceCode : {
        type : String,
        required : [true, "Please enter the serviceCode"],
        enum : {
            values : [
                "6S_AIRPORT",
                "6S_ONE_WAY",
                "6S_TWO_WAY",
                "6S_HOURLY_BOOKING",
                "6S_CRUISE",
                "6S_CTS",

                "7S_AIRPORT",
                "7S_ONE_WAY",
                "7S_TWO_WAY",
                "7S_HOURLY_BOOKING",
                "7S_CRUISE",
                "7S_CTS",

                "9S_AIRPORT",
                "9S_ONE_WAY",
                "9S_TWO_WAY",
                "9S_HOURLY_BOOKING",
                "9S_CRUISE",
                "9S_CTS",

                "13S_AIRPORT",
                "13S_ONE_WAY",
                "13S_TWO_WAY",
                "13S_HOURLY_BOOKING",
                "13S_CRUISE",
                "13S_CTS",

                "23S_AIRPORT",
                "23S_ONE_WAY",
                "23S_TWO_WAY",
                "23S_HOURLY_BOOKING",
                "23S_CRUISE",

                "45S_AIRPORT",
                "45S_ONE_WAY",
                "45S_TWO_WAY",
                "45S_HOURLY_BOOKING",
                "45S_CRUISE"


                
            ],
            message : "Please select correct serviceCode, for.eg, 9S_AIRPORT"
        }
    },
    

    serviceCategory : {
        type : String,
        required : [true, "Please enter the service category"],
        enum : {
            values : [
                "ONE_WAY_TRANSFER",
                'TWO_WAY_TRANSFER',
                'AIRPORT_TRANSFER',
                'HOURLY_BOOKING',
                'CRUISE_TRANSFER',
                'CITY_TRANSFER'
            ],
            message : "Please select correct service category, for.eg, ONE_WAY_TRANSFER"
        }
    },

    images : [
        {
            image : {
                type : String,
                required : true
            }
        }
    ],
    
    
},{timestamps : true})


let schema = mongoose.model('Service', serviceSchema)
module.exports = schema


