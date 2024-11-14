const Vehicle = require("../models/vehicleModel")
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//GET ALL Vehicle   http://127.0.0.1:8000/api/v1/Vehicle
exports.getVehicles = catchAsyncError(
    async (req, res, next) => {
        console.log("INSISE GET VEHICLE CONTROLLER");

        const resPerPage = 10;
        const apiFeatures = new APIFeatures(Vehicle.find(), req.query).search().filter().paginate(resPerPage);

        const vehicles = await apiFeatures.query;
    
        res.status(200).json({
            success : true,
            count : vehicles.length,
            vehicles
        })
    }
) 

//CREATE Vehicle   http://127.0.0.1:8000/api/v1/Vehicle/new
exports.newVehicle = catchAsyncError(
    async (req, res, next) => {
        // req.body.user = req.user.id;
        const vehicle = await Vehicle.create(req.body)
        res.status(201).json({
            success : true,
            vehicle
        })      
    }
) 

//GET SINGLE Vehicle   http://127.0.0.1:8000/api/v1/Vehicle/:id
exports.getSingleVehicle = catchAsyncError(
    async (req, res, next) => {
        const vehicle = await Vehicle.findById(req.params.id)
        
        if(!vehicle) {
            return next(new ErrorHandler('Vehicle not found', 400))
        }
    
        res.status(201).json({
            success : true,
            vehicle
        })
    }
)


//UPDATE Vehicle   http://127.0.0.1:8000/api/v1/Vehicle/:id
exports.updateVehicle = catchAsyncError(
    async (req, res, next) => {
        let vehicle = await Vehicle.findById(req.params.id)
        
        if(!vehicle) {
            return res.status(404).json({
                success : false,
                message : "Vehicle not found"
            })
        }
    
        vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })
    
        res.status(200).json({
            success : true,
            vehicle
        })
    }
) 



//DELETE Vehicle   http://127.0.0.1:8000/api/v1/Vehicle/:id
exports.deleteVehicle = catchAsyncError(
    async (req, res, next) => {
        let vehicle = await Vehicle.findById(req.params.id)
        
        if(!vehicle) {
            return res.status(404).json({
                success : false,
                message : "Vehicle not found"
            })
        }
    
        // Vehicle = await Vehicle.findByIdAndDelete(req.params.id)
    
        await vehicle.deleteOne()
    
        res.status(200).json({
            success : true,
            message : "Vehicle has been deleted"
        })
    }    
) 
