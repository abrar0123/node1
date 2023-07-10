const mongoose = require("mongoose");
const dataBaseName = "MDProducts";
const moment = require("moment");

const tourSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  price: Number,
});

const uogSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  cgpa: Number,
  pic: String,
  location: String,
});

const MDProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have name"],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, "A product must have durations"],
  },

  maxGroupSize: {
    type: Number,
    required: [true, "A product must have max group sizing"],
  },
  difficulty: {
    type: String,
    required: [true, "A product must have difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A product must have name"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "a product must have description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A product must have image Cover"],
  },
  images: [String],
  createdAt: {
    type: String,
    default: moment().format("lll"),
  },
  startDates: [Date],
});

const DBModel = mongoose.model(dataBaseName, MDProductsSchema);
// const Tour1 = mongoose.model("Tour1", tourSchema);

module.exports = DBModel;

// module.exports = { Tour: Tour };
