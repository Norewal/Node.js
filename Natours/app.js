const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();


//  1 - Middlewares
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
}

app.use(express.json());   //middleware - POST request
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


//   3 - Mounting Routes
app.use('/api/v1/tours', tourRouter);   //middleware
app.use('/api/v1/users', userRouter);   //middleware


// 4 - Start server
module.exports = app;
