const subServices = require('../data/subServices.json')

const SubService = require('../models/subServiceModel')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

dotenv.config({path : "backend/config/config.env"});
connectDatabase();

const seedSubServices = async () => {

    try {
        await SubService.deleteMany()
        console.log("All Sub-Services deleted")
        await SubService.insertMany(subServices)
        console.log('All Sub-Services Added')

    } catch (error) {
        console.log(error.message)
    }
    process.exit();
    
}

seedSubServices();



