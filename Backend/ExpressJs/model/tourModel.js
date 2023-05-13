const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  price: Number,
});

const Tour = mongoose.model("Tour", tourSchema);
// const Tour1 = mongoose.model("Tour1", tourSchema);

module.exports = Tour;

// module.exports = { Tour: Tour };
