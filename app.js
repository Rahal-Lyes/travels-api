const express = require('express');
const app = express();
const AppError=require('./utils/appError.js');
const globalErrorHandler=require('./controllers/errorController.js');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes.js');
const tourRouter = require('./routes/tourRoutes.js');

//middleWares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);


app.all('*',(req,res,next)=>{

  next(new AppError(`can't find ${req.originalUrl}`,404));
}) 
app.use(globalErrorHandler);

module.exports = app;
