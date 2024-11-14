const SubService = require("../models/subServiceModel")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//GET ALL Service   http://127.0.0.1:8000/api/v1/Service
exports.getSubServices = catchAsyncError(
    async (req, res, next) => {
        
        const resPerPage = 60;
        const apiFeatures = new APIFeatures(SubService.find(), req.query).search().filter().paginate(resPerPage);

        const subServices = await apiFeatures.query;
    
        res.status(200).json({
            success : true,
            count : subServices.length,
            subServices
        })
    }
) 

//CREATE sub Service   http://127.0.0.1:8000/api/v1/Service/new
exports.newSubService = catchAsyncError(
    async (req, res, next) => {
        req.body.serviceId = req.params.id;
        const subService = await SubService.create(req.body)
        res.status(201).json({
            success : true,
            subService
        })      
    }
) 

//GET SINGLE Service   http://127.0.0.1:8000/api/v1/Service/:id
exports.getSingleSubService = catchAsyncError(
    async (req, res, next) => {
        const subService = await SubService.findById(req.params.id)
        
        if(!subService) {
            return next(new ErrorHandler('SubService not found', 400))
        }
    
        res.status(201).json({
            success : true,
            subService
        })
    }
)


//UPDATE Service   http://127.0.0.1:8000/api/v1/Service/:id
exports.updateSubService = catchAsyncError(
    async (req, res, next) => {
        let subService = await SubService.findById(req.params.id)
        
        if(!subService) {
            return res.status(404).json({
                success : false,
                message : "Sub Service not found"
            })
        }
    
        subService = await SubService.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })
    
        res.status(200).json({
            success : true,
            subService
        })
    }
) 



//DELETE Service   http://127.0.0.1:8000/api/v1/Service/:id
exports.deleteSubService = catchAsyncError(
    async (req, res, next) => {
        let subService = await SubService.findById(req.params.id)
        
        if(!subService) {
            return res.status(404).json({
                success : false,
                message : "Sub Service not found"
            })
        }
    
        // Service = await Service.findByIdAndDelete(req.params.id)
    
        await subService.deleteOne()
    
        res.status(200).json({
            success : true,
            message : "Sub Service has been deleted"
        })
    }
    
) 

