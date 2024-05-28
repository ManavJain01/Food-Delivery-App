// Importing Packages
const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Connecting MongoDB Server
mongoDB();

// Connecting Express
app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
})