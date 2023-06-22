const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true,
        default:Date.now
    }
  });
//   model.exports=mongoose.model("user",userSchema)
const User=mongoose.model("user", userSchema);
module.exports= User;