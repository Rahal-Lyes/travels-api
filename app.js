const express = require('express');
const app = express();
const morgan=require('morgan');
const userRouter=require('./routes/userRoutes.js');
const tourRouter=require('./routes/tourRoutes.js');
//middleWares
app.use(morgan('dev'));
app.use(express.json());


const PORT = 3000;
app.use('/api/v1/users',userRouter);
app.use('/api/v1/tours',tourRouter);


app.listen(PORT, function () {
  console.log(`Running on port: ${PORT}`);
});


