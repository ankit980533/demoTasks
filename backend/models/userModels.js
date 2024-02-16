const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },

    email:{
        required:true,
        type:String,
        unique:true,
        trim:true,
    } ,
    password:{
        required:true,
        type:String,
        minLength:6,
    }
})

// const User=mongoose.model("user",userSchema);
// module.exports={
//     User
// };
module.exports=User=mongoose.model("users",userSchema);