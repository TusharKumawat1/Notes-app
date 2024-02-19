const mongoose =require('mongoose');
const mongoUri='mongodb+srv://tusharkumawat9694:tushar%40@cluster0.bmp19bn.mongodb.net/';
const connectToMongo=()=>{
    mongoose.connect(mongoUri ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      }).then (()=>console.log('successfully connected'))
    .catch((err)=>console.log("unable to connect "+err)) ;
}
module.exports=connectToMongo; 