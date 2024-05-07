const mongoose=require('mongoose')

const Mregistration=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
         type:String,
        required:true
    },
    contactnum:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    coursecode:{
        type:Number,
        required:true
    },
    online:{
        type:String
     
    
    },
    recorded:{
        type:String
       
    }


})

const register=new mongoose.model('register',Mregistration)
module.exports={
    register:register
}