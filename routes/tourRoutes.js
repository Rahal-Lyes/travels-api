const express =require('express');
const fs=require('fs');

const router=express.Router();
//read file from exertnale with synchronose way
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);
router.route('/')
      .get(getAllTours)
      .post(createTour);

router.route('/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour);



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
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).send({ message: 'not find' });
  }

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
  if (!tour) {
    return res.status(404).send({ message: 'not find' });
  }
  res.status(200).json({
    message: 'Updated Successfuly',
  });
}

function deleteTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ message: 'Tours not find' });
  }
  res.status(200).json({
    message: 'Delete Successfuly',
  });
}
module.exports=router;