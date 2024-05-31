// Importing Packages
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

// Importing env file
require("dotenv").config();

// Importing local files
const User = require('../models/User')

// Hashing
const bcrypt = require("bcryptjs")

// Json Web Token
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET

router.post("/loginUser", [
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min: 5 }),
], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }


  let email = req.body.email;
  try {
    let userData = await User.findOne({email});

    if(!userData) return res.status(400).json({ errors: "Try logging with correct credentials" })
    
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
    if(!pwdCompare)  return res.status(400).json({ errors: "Try logging with correct credentials" })

    const data = {
      user:{
        id:userData.id
      }
    }
    
    const authToken = jwt.sign(data, jwtSecret)

    return res.json({ success: true, authToken: authToken, name: userData.name})
  } catch (error) {
    console.log(error);
    res.json({success:false})
  }
}
)

module.exports = router;