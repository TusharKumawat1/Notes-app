const mongoose =require('mongoose');
const mongoUri='mongodb://127.0.0.1:27017/userdatabase';
const connectToMongo=()=>{
    mongoose.connect(mongoUri ).then (()=>console.log('successfully connected'))
    .catch((err)=>console.log("unable to connect "+err)) ;
}
module.exports=connectToMongo; 