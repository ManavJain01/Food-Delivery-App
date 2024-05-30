// Importing Packages
const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/LoginUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))

// Connecting MongoDB Server
mongoDB();

// Connecting Express
app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
})