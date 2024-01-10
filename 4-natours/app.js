const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
// 1. Middleware

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log('Hello From Middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 4. Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
    
module.exports = app;