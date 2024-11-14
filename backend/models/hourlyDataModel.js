const mongoose = require('mongoose')

const hourlyDataSchema = new mongoose.Schema({
    title: {
        type : String,
        required : [true, "Please enter the hourly data title"],
        trim : true,
        maxLength : [70, "hourly data title cannot exceed 60 characters"]
    },

    data : [
       

        {
            _id: {type : String, required : [true, "Please enter the _id"]},
            value: {type : Number, required : [true, "Please enter the value"]},
            hours: {type : Number, required : [true, "Please enter the hours"]},
            name: {type : String, required : [true, "Please enter the name"]},
            title : {type : String, required : [true, "Please enter the title"]},
          },
    ],


    hourlyDataCategory : {
        type : String,
        required : [true, "Please enter the vehicle category"],
        enum : {
            values : [
                "6_7_9_13_SEATER",
                '23_SEATER',
                '45_SEATER'
            ],
            message : "Please select correct category, for.eg, 13 SEATER"
        }
    },

    
    
},{timestamps : true})


let schema = mongoose.model('HourlyData', hourlyDataSchema)
module.exports = schema


