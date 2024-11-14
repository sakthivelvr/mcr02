const Service = require("../models/serviceModel")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//GET ALL Service   http://127.0.0.1:8000/api/v1/Service
exports.getServices = catchAsyncError(
    async (req, res, next) => {
        
        const resPerPage = 60;
        const apiFeatures = new APIFeatures(Service.find(), req.query).search().filter().paginate(resPerPage);

        const services = await apiFeatures.query;
    
        res.status(200).json({
            success : true,
            count : services.length,
            services
        })
    }
) 

//CREATE Service   http://127.0.0.1:8000/api/v1/Service/new
exports.newService = catchAsyncError(
    async (req, res, next) => {
        req.body.vehicleId = req.params.id;
        const service = await Service.create(req.body)
        res.status(201).json({
            success : true,
            service
        })      
    }
) 

//GET SINGLE Service   http://127.0.0.1:8000/api/v1/Service/:id
exports.getSingleService = catchAsyncError(
    async (req, res, next) => {
        const service = await Service.findById(req.params.id)
        
        if(!service) {
            return next(new ErrorHandler('Service not found', 400))
        }
    
        res.status(201).json({
            success : true,
            service
        })
    }
)


//UPDATE Service   http://127.0.0.1:8000/api/v1/Service/:id
exports.updateService = catchAsyncError(
    async (req, res, next) => {
        let service = await Service.findById(req.params.id)
        
        if(!service) {
            return res.status(404).json({
                success : false,
                message : "Service not found"
            })
        }
    
        service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })
    
        res.status(200).json({
            success : true,
            service
        })
    }
) 



//DELETE Service   http://127.0.0.1:8000/api/v1/Service/:id
exports.deleteService = catchAsyncError(
    async (req, res, next) => {
        let service = await Service.findById(req.params.id)
        
        if(!service) {
            return res.status(404).json({
                success : false,
                message : "Service not found"
            })
        }
    
        // Service = await Service.findByIdAndDelete(req.params.id)
    
        await service.deleteOne()
    
        res.status(200).json({
            success : true,
            message : "Service has been deleted"
        })
    }
    
) 

