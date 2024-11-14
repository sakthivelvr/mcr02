const hourlyData = require('../data/hourlyData.json')

const HourlyData = require('../models/hourlyDataModel')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

dotenv.config({path : "backend/config/config.env"});
connectDatabase();

const seedHourlyData = async () => {

    try {
        await HourlyData.deleteMany()
        console.log("All Hourly deleted")
        await HourlyData.insertMany(hourlyData)
        console.log('All Hourly Added')

    } catch (error) {
        console.log(error.message)
    }
    process.exit();
    
}

seedHourlyData();



