const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//using bcrypt
const bcrypt = require('bcrypt');
//using jwt
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
//Auth:1 Create a User using: POST "/api/auth/createuser". Doesn't require Auth
const jwtsec="xd222@@@111";
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 1 }),
    body("email", "Enter a valid emali").isEmail(),
    body("password", "Atleast 6 characters").isLength({ min: 6 }),
  ],
  //validations
  async (req, res) => {
    let success=false;
    const error = validationResult(req);
    //checking if any error occurs
    if (!error.isEmpty()) {
      return res.status(400).json({ success,error: error.array() });
    }
    try {
      //cheacking unique email
      var user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Please enter a unique email" });
      }
      const salt=await bcrypt.genSalt(10);
      const securePass=await bcrypt.hash(req.body.password,salt);
      //sending data to db
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken  = jwt.sign(data, jwtsec);
      success=true
      console.log(success,authtoken );
      res.json({success,authtoken })
      // res.json(user);
    } catch (err) {
      console.log("error ", err);
      res.status(500).send("Some error occured");
    }
  }
);
//Auth:2 authenticate a User using: POST "/api/auth/login". Doesn't require Auth
router.post(
  "/login",
  [
   
    body("email", "Enter a valid emali").isEmail(),
    body("password", "Atleast 6 characters").exists(),
  ],
  //validations
  async (req, res) => {
    let success=false;
    const error = validationResult(req);
    //checking if any error occurs
    if (!error.isEmpty()) {
      return res.status(400).json({ success,error: error.array() });
    }
    const {email,password}=req.body;
    try {
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({ success,error: "please enter right credentials"});
      }
      const comparePass=await bcrypt.compare(password,user.password);
      if(!comparePass){
        return res.status(400).json({ success,error: "please enter right credentials"});
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken  = jwt.sign(data, jwtsec);
      success=true
      console.log(success,authtoken );
      res.json({success,authtoken })
    } catch (err) {
      console.log("error ", err);
      res.status(500).send("Internal Server ERROR:");
    }
  })
//Auth:2 fetch a User using: POST "/api/auth/getuser". Doesn't require Auth
router.post(  "/getuser",
  fetchuser,
  //validations
  async (req, res) => {
    try {
      userId=req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (err) {
      console.log("error ", err);
      res.status(500).send("Internal Server ERROR:");
    }
  })
module.exports = router;
