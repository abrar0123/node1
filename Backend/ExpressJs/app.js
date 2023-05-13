const express = require("express");
const fs = require("fs");
const Tour = require("./model/tourModel");
// const { Tour } = require("./model/tourModel");
const app = express();
const server = require("./server");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

//  mongodb database connection established

server.DataBase_Connection;

app.use(express.json()); // middleware

app.get("/", (req, res) => {
  res.send({
    message: "welcome to express development with Node JS development ",
    app: "Node app",
  });
});

const json = fs.readFileSync(`${__dirname}/tours.json`);

const tours = JSON.parse(json);

const getAllTours = async (req, res) => {
  try {
    const tour1 = await Tour.find();
    res.status(200).json({
      status: "Successful",
      results: tour1.length,
      data: {
        tours: tour1,
      },
    });
  } catch (error) {
    console.log("error__\n\n", error);
    res.status(404).json({
      status: "fail",
      error: error,
    });
  }
};

const postTour = async (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Invalid data sent",
      eror: error,
    });
  }

  // tours.push(newTour);
  // fs.writeFile(`${__dirname}/tours.json`, JSON.stringify(tours), (err) => {
  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       tours: newTour,
  //     },
  //   });
  // });
};

//  respond to url parameter data
const getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        tours: tour,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({
      status: "fail",
      message: "Invaid Id",
      error: error,
    });
  }
};

//  patch /update user record
const patchTour = async (req, res) => {
  // const id = req.params.id * 1;

  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: updateTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: error,
    });
  }
};

//  delete user record
const deleteTour = async (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((e) => e.id === id);

  try {
    const deleteTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      data: deleteTour,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: null,
    });
  }
};

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", postTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", patchTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(postTour);
app.route("/api/v1/tours/:id").get(getTour).patch(patchTour).delete(deleteTour);

const port = 5000;
app.listen(port, () => {
  console.log(`Server started in express at port ${port}...`);
});
