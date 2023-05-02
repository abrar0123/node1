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

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
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
  // res.send("done status");
});

app.get("/about", (req, res) => {
  res.status(200).send("welcome to about page of express development");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server stated in express at port ${port}`);
});
