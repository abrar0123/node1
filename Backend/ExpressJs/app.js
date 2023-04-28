const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("welcome to express development with node Js ");
  console.log("good");
});

app.get("/home", (req, res) => {
  res.send("welcome to home page of express development");
});

app.get("/about", (req, res) => {
  res.send("welcome to about page of express development");
});

const port = 5000;
app.listen(port, () => {
  console.log(`welcome to express port ${port}`);
});
