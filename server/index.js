// Importing Packages
const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")

// Importing env file
require("dotenv").config();

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin",process.env.CLIENT_LOCATION);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('<div>This is the BackEnd</div>')
})

// app.use
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/LoginUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))
app.use('/api', require("./Routes/OrderHistory"))

// Connecting MongoDB Server
mongoDB();

// Connecting Express
app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
})