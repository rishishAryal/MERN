const express = require("express");
const app = express();
const port = 5000;
const connectToMongoDB = require("./db");

// Call the connectToMongoDB function to connect to the database
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json())
 app.use('/api/',require("./Routes/CreateUser"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
