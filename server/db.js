const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://bestFood:bestFoodHere@cluster0.lpfyood.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async() => {
  await mongoose.connect(mongoURI)
}

module.exports = mongoDB;