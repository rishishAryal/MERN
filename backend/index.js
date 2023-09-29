const express = require("express");
const app = express();
const port = 5000;
const connectToMongoDB = require("./db");

// Call the connectToMongoDB function to connect to the database
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//set the CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
app.use(express.json());
app.use("/api/", require("./Routes/CreateUser"));
app.use("/api/", require("./Routes/DisplayData"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
