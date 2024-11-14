const mongoose = require('mongoose')

const serviceNewSchema = new mongoose.Schema({
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

    serviceId: {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, "Please enter the Service ID for the service"],
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
    

    subServiceCategory : {
        type : String,
        required : [true, "Please enter the sub-service category"],
        enum : {
            values : [
                "AIRPORT_SUB_SERVICE",
                'ONE_WAY_TRANSFER',
                'TWO_WAY_TRANSFER',
                'HOURLY_BOOKING',
                'CRUISE_SUB_TRANSFER',

                'AIRPORT_DEP',
                'AIRPORT_ARR',
                'AIRPORT_DEP_ARR',

                'CRUISE_ARR',
                'CRUISE_DEP',

                'CITY_TRANSFER'

            ],
            message : "Please select correct sub-service category, for.eg, HOURLY_BOOKING"
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


let schema = mongoose.model('subService', serviceNewSchema)
module.exports = schema


