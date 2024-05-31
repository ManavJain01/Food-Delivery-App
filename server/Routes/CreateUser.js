// Importing Packages
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

// Importing local files
const User = require('../models/User')

// Hashing
const bcrypt = require("bcryptjs")

// Json Web Token
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET

// Getting route request
router.post("/createUser", [
    body('email').isEmail(),
    //Password must be at least 5 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('name', 'Name is Too Short').isLength({ min: 5 })
  ],async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      })

      const authToken = jwt.sign(req.body.email, jwtSecret)

      res.json({success:true, authToken: authToken});
    } catch (error) {
      console.log(error);
      res.json({success:false})
    }
  }
)

module.exports = router;