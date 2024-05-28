// Importing Packages
const express = require('express')
const router = express.Router()

// Importing local files
const User = require('../models/User')

router.post("/foodData",(req, res) => {
  try {
    res.send([global.food_items, global.foodCategory])
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;