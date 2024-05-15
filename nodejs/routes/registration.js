const express = require('express');
const { Registration } = require('../models/todo'); // Corrected model import

const routes = express.Router();

routes.post('/', async function(req, res) {
    // Destructuring req.body directly into the data object
    const { fullname, cnic, education, skills, DateOfBirth, country, district, stateprovince, phonenum, whatsappnum, email, password,confirmpassword, currentcity, currentaddress } = req.body;
    if(password !=confirmpassword){
        res.send("Your password and confirm password is not equal ")
    }
    // Creating a new instance of the Registration model with the data
    const result = new Registration({
        fullname,
        cnic,
        education,
        skills,
        DateOfBirth,
        country,
        district,
        stateprovince,
        phonenum,
        whatsappnum,
        email,
        password,
        currentcity,
        currentaddress
    });

    try {
        // Saving the new instance to the database
        await result.save();
        res.status(201).send(result);
    } catch (err) {
        // Handling any errors that occur during saving
        res.status(400).send(err);
    }
});

module.exports = routes;
