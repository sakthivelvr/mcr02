const vehicles = require('../data/vehicles.json')

const Vehicle = require('../models/vehicleModel')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

dotenv.config({path : "backend/config/config.env"});
connectDatabase();

const seedVehicles = async () => {

    try {

        await Vehicle.deleteMany()
        console.log("All vehicles deleted")
        await Vehicle.insertMany(vehicles)
        console.log('All Vehicles Added')

    } catch (error) {
        console.log(error.message)
    }
    process.exit();
    
}

seedVehicles();



