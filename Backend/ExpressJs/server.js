const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

const myconn = mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => {
    // console.log("conn__\n\n", con.connection);
    console.log("Connection Successfully");
  })
  .catch((err) => {
    console.log("Connection Error_\n\n", err);
  });

// const Tour = require("./model/tourModel");

// const newTour = new Tour({
//   name: "us",
//   rating: 4.2,
//   price: 100,
// });

// newTour
//   .save()
//   .then((e) => {
//     console.log("successfuly added", e);
//   })
//   .catch((e) => {
//     console.log("database error_", e);
//   });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}...`);
});

module.exports = { DataBase_Connection: myconn, PORT: PORT };
