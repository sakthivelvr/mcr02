const HourlyData = require("../models/hourlyDataModel")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//GET ALL hourly data   http://127.0.0.1:8000/api/v1/products
exports.getHourlyData = catchAsyncError(
    async (req, res, next) => {
        
        const resPerPage = 5;
        const apiFeatures = new APIFeatures(HourlyData.find(), req.query).search().filter().paginate(resPerPage);

        const hourlyData = await apiFeatures.query;
    
        res.status(200).json({
            success : true,
            count : hourlyData.length,
            hourlyData 
        })
    }
) 

