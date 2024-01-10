const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express();

// 1. Middleware
app.use(morgan('dev'));

app.use(express.json());

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
    
// Server Listener
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});