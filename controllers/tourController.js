const Tour = require('../models/tourModels');
const APIFeatures = require('./../utils/apiFeatures');
// all funtions
async function getAllTours(req, res){
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};


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
      message: err.message,
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
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Updated Successfuly',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function deleteTour(req, res) {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'Deleted Successfuly',
    });
  } catch (err) {
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
