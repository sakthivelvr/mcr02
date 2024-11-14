const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Please enter the Vehicle name"],
        trim : true,
        maxLength : [70, "Vehicle name cannot exceed 60 characters"]
    },

    type: {
        type : String,
        required : [true, "Please enter the Vehicle Type"],
        trim : true,
        maxLength : [150, "Vehicle type name cannot exceed 150 characters"]
    },

    label: {
        type : String,
        required : [true, "Please enter the Vehicle label"],
        trim : true,
        maxLength : [60, "Vehicle type name cannot exceed 150 characters"]
    },

    noOfSeats: {
        type : Number,
        required : true
    },
    
    desc: {
        type : String,
        required : true
    },
    
    services: {
        type : [mongoose.Schema.Types.ObjectId]
    },

    cheapestPrice: {
        type : Number,
        required : true
    },

    currency: {
        type : String,
        default : "SGD"
    },
    
    images : [
        {
            image : {
                type : String,
                required : true
            }
        }
    ],
    
    category : {
        type : String,
        required : [true, "Please enter the category"],
        enum : {
            values : [
                "6 SEATER",
                '7 SEATER',
                '9 SEATER',
                '13 SEATER',
                '23 SEATER',
                '40/45 SEATER'
            ],
            message : "Please select correct category, for.eg, 13 SEATER"
        }
    }
},{timestamps : true})


let schema = mongoose.model('Vehicle', vehicleSchema)
module.exports = schema


