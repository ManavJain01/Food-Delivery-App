const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

const User = require('../models/User')

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

    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location
      })

      res.json({success:true});
    } catch (error) {
      console.log(error);
      res.json({success:false})
    }
  }
)

module.exports = router;