const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://gofood:gofoodmern@cluster0.n7oyesp.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const fetchedData = await mongoose.connection.db.collection("food_items");
    const data = await fetchedData.find({}).toArray();

    console.log(data);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongoDB;
