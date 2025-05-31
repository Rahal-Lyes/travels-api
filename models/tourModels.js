const mongoose = require('mongoose');
// Correction du schéma Tour
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    trim:true,
  },
  duration:{
    type:Number,
    required:[true,'Durations must have a value']
  },
  maxGroupSize:{
    type:Number,
    required:[true,'A tour must have a group size']
  },
  difficulty:{
    type:String,
    required:[true,'Should have a difficulty']
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantite:{
    type:Number,
    default:0
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  priceDescount:Number,
  summary:{
    type:String,
    trim:true,
    required:[true,'Must Have a description'],
  },
  description:{
    type:String,
    trim:true
  },
  imageCover:{
    type:String,
required:[true,'Must have a cover images']
  },
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now(),
    select:false
  },
  startDates:[Date]
});

// Création du modèle
const Tour = mongoose.model('Tour', tourSchema);

module.exports= Tour;