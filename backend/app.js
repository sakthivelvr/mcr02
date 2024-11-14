const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error')
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path : path.join(__dirname, "config/config.env")});

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')
const vehicle = require('./routes/vehicle')
const service = require('./routes/service')
const subService = require('./routes/subService')
const hourlyData = require('./routes/hourlyData')


app.use('/api/v1/', products)
app.use('/api/v1/', auth)
app.use('/api/v1/', order)
app.use('/api/v1/', payment)
app.use('/api/v1/', vehicle)
app.use('/api/v1/', service)
app.use('/api/v1/', subService)
app.use('/api/v1/', hourlyData)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware)



module.exports = app;


