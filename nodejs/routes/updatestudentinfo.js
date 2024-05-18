const express = require('express');
const routes = express.Router();
const { Registration } = require('../models/todo');

routes.post('/', async function(req, res) {
    const { fullname, password, cnic, country, currentcity, phonenum, whatsappnum, email, coursecode, role, currentaddress } = req.body;

    if (!fullname) {
        return res.status(400).send({ message: "Full name is required" });
    }

    try {
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

        // Find the user by fullname and update their information
        const user = await Registration.findOneAndUpdate(
            { fullname: fullname }, // Filter by fullname
            { $set: dataToUpdate }, // Update specific fields with provided data
            { new: true } // Return the updated document
        );

        // Check if user exists
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Send the updated user as response
        res.status(200).send(user);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = routes;
