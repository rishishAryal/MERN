const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://gofood:gofoodmern@cluster0.n7oyesp.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");

    // Fetch data in parallel using Promise.all
    const [foodItemsData, foodCategoryData] = await Promise.all([
      mongoose.connection.db.collection("food_items").find({}).toArray(),
      mongoose.connection.db.collection("foodCategory").find({}).toArray(),
    ]);

    // Assign fetched data to global variables using destructuring
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;
    console.log("Successfully fetched data from MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Throw the error so it can be handled by the calling code
  }
};

module.exports = connectToMongoDB;
