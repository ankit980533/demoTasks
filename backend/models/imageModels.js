const mongoose=require('mongoose');

const imageSchema= new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports=Image=mongoose.model("images",imageSchema);