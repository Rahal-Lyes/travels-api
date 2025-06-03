const Tour = require('../models/tourModels');
const APIFeatures = require('./../utils/apiFeatures');
const AppError=require('../utils/appError');
const catchAsync=require('../utils/catchAsync');
// all funtions

const  getAllTours=catchAsync(async(req, res,next)=>{

    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });

});

const getTourById=catchAsync(async (req, res,next)=> {

    const tour = await Tour.findById(req.params.id);

    if(!tour){
      return next(new AppError('No Tour Find With This Id',404));
    }
    res.status(200).json({
      message: 'Success',

      data: {
        tour,
      },
    });
  
})




const createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.json({
    message: 'success',
    data: { newTour },
  });
});


const updateTour=catchAsync(async(req, res,next)=> {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  if(!tour){
      return next(new AppError('No Tour Find With This Id',404));
    }
    res.status(200).json({
      status: 'Updated Successfuly',
      data: {
        tour,
      },
    });

})

const deleteTour=catchAsync(async(req, res,next)=> {

  const tour=  await Tour.findByIdAndDelete(req.params.id);
  if(!tour){
      return next(new AppError('No Tour Find With This Id',404));
    }
    res.status(200).json({
      status: 'Deleted Successfuly',
    });

})

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
