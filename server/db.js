// Importing env file
require("dotenv").config();

const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_PASSWORD
const mongoDB = async() => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected!");

    let fetched_data = mongoose.connection.db.collection("food_items");
    let data = await fetched_data.find({}).toArray()
    
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    let categoryData = await foodCategory.find({}).toArray()
    
    global.food_items = data;
    global.foodCategory = categoryData;
  } catch (error) {
    console.log("err:", error);
  }
}

module.exports = mongoDB;