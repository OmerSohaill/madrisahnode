const mongoose=require('mongoose')

//User Registration Schemas

const register=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    cnic:{
        type:Number,
        required:true,
        unique:true

    },
    education:{
        type:String,
        
    },
    skills:{
        type:String
    },
    DateOfBirth:{
        type:Number,
        
    },
    country:{
        type:String,
        required:true
    },
    disctrict:{
        type:String,
        required:true
    },
    stateprovince:{
        types:String,
        required:true
    },
    phonenum:{
        type:Number,
        require:true,
        unique:true
    },
    whatsappnum:{
        type:Number,
        required:true,
        unique:true
    }, email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    currentcity:{
        type:String,
        required:true
    },
    currentaddress:{
        required:true
    }   
})

const registration=new mongoose.model('registration',register)

module.exports={
    registration:registration
}