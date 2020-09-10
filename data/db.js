const mongoose = require('mongoose');
const pid = process.pid
const DB_URI = process.env.DB_URI


mongoose.connect(DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`MongoDB connected ${pid}`)
}).catch(err=>console.log(err))


module.exports={
    mongoose
}