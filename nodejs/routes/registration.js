const express = require('express');
const { Registration } = require('../models/todo'); // Corrected model import

const routes = express.Router();

routes.post('/', async function(req, res) {
    // Destructuring req.body directly into the data object
    const { fullname, online,recorded,cnic, education,coursecode, skills, DateOfBirth, country, district, stateprovince, phonenum, whatsappnum, email, password,confirmpassword, currentcity, currentaddress } = req.body;
    if(password !=confirmpassword){
        res.send("Your password and confirm password is not equal ")
    }
    try{

    

    // Creating a new instance of the Registration model with the data
    if(online){
        const classtype='online';
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
            currentaddress,
            coursecode,
            classtype
        });
        await result.save();
        res.status(201).send(result);
    }
    if(recorded){
        const classtype='recorded'
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
            currentaddress,
            coursecode,
            classtype
        });
        await result.save();
        res.status(201).send(result);

    }
    

}catch (err) {
        // Handling any errors that occur during saving
        res.status(400).send(err);
    }
});

module.exports = routes;
