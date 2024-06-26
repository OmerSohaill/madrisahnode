const express = require('express');
const routes = express.Router();
const { Registration } = require('../models/todo');
 const {getuser,setuser,deleteuser}=require('../controllers/auth')

routes.post('/', async function(req, res) {
    try {

    let { fullname, password, cnic, country, currentcity, phonenum, whatsappnum, email, coursecode, role, currentaddress,classtype } = req.body;
    fullname=fullname.toUpperCase()
    

    if (!fullname) {
        return res.status(400).send({ message: "Full name is required" });
    }
    
        const dataToUpdate = {};
        if (password) dataToUpdate.password = password;
        if (country) dataToUpdate.country = country;
        if (currentcity) dataToUpdate.currentcity = currentcity;
        if (currentaddress) dataToUpdate.currentaddress = currentaddress;
        if (cnic) dataToUpdate.cnic = cnic;
        if (phonenum) dataToUpdate.phonenum = phonenum;
        if (whatsappnum) dataToUpdate.whatsappnum = whatsappnum;
        if (email) dataToUpdate.email = email;
        if (coursecode) dataToUpdate.coursecode = coursecode;
        if (role) dataToUpdate.role = role;
        if(classtype) dataToUpdate.classtype=classtype

        // Find the user by fullname and update their information
        const user = await Registration.findOneAndUpdate(
            { fullname: fullname }, // Filter by fullname
            { $set: dataToUpdate }, // Update specific fields with provided data
            { new: true } ,// Return the updated document
            
          
        );
      
        setuser(user)

        // Check if user exists
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Send the updated user as response
        res.status(200).send(`Student UPDATE SUCCESSFULLY `);
    } catch (error) {
        // Handle errors
      
        res.status(500).send(error.message);
    }
});

module.exports = routes;
