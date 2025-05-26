const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);

function checkId(req, res, next) {

  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next();
}


function checkBody(req,res,next){
  if (!req.body.name || !req.body.price){
    res.status(404).json({
      message:"Missing Name Or Price"
    })
  }
  next();
}
// all funtions
function getAllTours(req, res) {
  res.status(200).json({
    status: 'Success',
    result: tours.length,

    data: {
      tours: tours,
    },
  });
}

function getTourById(req, res) {
  const id=Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  res.json({
    Message: 'success',
    data: tour,
  });
}

function createTour(req, res) {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tours: newTour },
      });
    }
  );
}

function updateTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    message: 'Updated Successfuly',
  });
}

function deleteTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    message: 'Delete Successfuly',
  });
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody
};
