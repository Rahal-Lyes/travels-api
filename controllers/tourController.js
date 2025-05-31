const Tour = require('../models/tourModels');

// all funtions
async function getAllTours(req, res) {


    try {
      //filtring 
      const queryObj={...req.query};
const excludeFields=['page','sort','limit','fields'];
excludeFields.forEach(el =>delete queryObj[el]);

// advanced filter

let queryStr = JSON.stringify(queryObj);

queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => {
  return `$${match}`;
});
    let query = Tour.find(JSON.parse(queryStr));



    // SORTING
    if(req.query.sort){
      sortBy=req.query.sort.split(',').join(' '); 
      query=query.sort(sortBy);
    }else{
      query=query.sort('-createdAt');
    }

    //LIMITING

    if(req.query.fields){
      const fields=req.query.fields.split(',').join(' ');
      query=query.select(fields);
    }else{
      query=query.select('-__v');
    }

    //pagination
    const tours=await query;
    // const tours=await Tour.find().where('duration').gte(5);
    res.status(200).json({
      message: 'Success',

      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'Field',
    });
  }
}

async function getTourById(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      message: 'Success',

      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Field',
      message:err.message
    });
  }
}

async function createTour(req, res) {
  try {
    const newTour = await Tour.create(req.body);
    res.json({
      Message: 'success',
      data: { newTour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}

async function updateTour(req, res) {
  try{
    const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    });

res.status(200).json({
    status: 'Updated Successfuly',
    data:{
      tour
    }

  });
  }catch(err){
  res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function deleteTour(req, res) {
  try{
  await Tour.findByIdAndDelete(req.params.id);

res.status(200).json({
    status: 'Deleted Successfuly',
  

  });
  }catch(err){
  res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
