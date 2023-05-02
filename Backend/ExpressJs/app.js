const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "welcome to express development with node Js development ",
    app: "Node",
  });
});

const json = fs.readFileSync(`${__dirname}/tours.json`);

const tours = JSON.parse(json);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const postTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/tours.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tours: newTour,
      },
    });
  });
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
app.get("/api/v1/tours", getAllTours);
app.post("/api/v1/tours", postTour);
app.get("/api/v1/tours/:id", getTour);
app.patch("/api/v1/tours/:id", patchTour);
app.delete("/api/v1/tours/:id", deleteTour);

const port = 5000;
app.listen(port, () => {
  console.log(`Server stated in express at port ${port}...`);
});
