const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
   
    tag:{
        type:String,
        default:"General" 
    },
   
    date:{
        type:Date,
        require:true,
        default:Date.now
    }
  });
  const Notes=mongoose.model("notes", notesSchema);
  module.exports= Notes;