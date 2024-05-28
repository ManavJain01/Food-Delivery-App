// Importing Packages
const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use
app.use('/api', require("./Routes/CreateUser"))

// Connecting MongoDB Server
mongoDB();

// Connecting Express
app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
})