const express = require("express");
const fs = require("fs");
const Tour = require("./model/tourModel");
// const { Tour } = require("./model/tourModel");
const app = express();
const Connection = require("./server");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );


//  mongodb database connection established

Connection.DataBase_Connection;

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
    console.log("body__1", req.body);

    const newTour = await new Tour(req.body);

    newTour
      .save()
      .then((e) => {
        console.log("successfuly added", e);
      })
      .catch((e) => {
        console.log("database error_", e);
      });

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log("body__2", error);
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
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.id === id);

  if (!tour) {
    return res.send(404).json({
      status: "fail",
      message: "Invaid Id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tours: tour,
    },
  });
};

//  patch /update user record
const patchTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "record not updated",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "update....",
    },
  });
};

//  delete user record
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "record not updated",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
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
