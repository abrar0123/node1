const mongoose = require("mongoose");
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => {
    console.log("conn__\n\n", con.connection);
    console.log("connection successfully");
  })
  .catch((err) => {
    console.log("error_\n\n", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}...`);
});
