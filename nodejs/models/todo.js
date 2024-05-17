const mongoose = require('mongoose');

// User Registration Schema
const registerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    cnic: {
        type: Number,
        required: true,
        unique: true
    },
    education: {
        type: String
    },
    skills: {
        type: String
    },
    DateOfBirth: {
        type: Date // or type: Number if storing timestamps
    },
    country: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    stateprovince: {
        type: String, // corrected typo
        required: true
    },
    phonenum: {
        type: Number,
        required: true,
        unique: true
    },
    whatsappnum: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    currentcity: {
        type: String,
        required: true
    },
    currentaddress: {
        type: String, // added type definition
        required: true
    },
    feespaid:{
        type:Number,
        default:0
    },
    coursecode:{
        type:Number,
        required:true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'teacher'],
        default: 'student'
    }
});
const Madmin=new mongoose.Schema({
     username:{
        type:String,
        require:true
    
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','teachers'],
        required:true
    }
})
const Registration = mongoose.model('Registration', registerSchema);
const Madrisahadmin=mongoose.model('Madrisahadmin',Madmin);
module.exports = {
    Registration: Registration,
    Madrisahadmin:Madrisahadmin
};
