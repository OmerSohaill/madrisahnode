const express = require('express');
const routes = express.Router();
const { setuser } = require('../controllers/auth');
const { Registration } = require('../models/todo');
routes.post('/', async function (req, res) {
    try {
 let { fullname, password } = req.body;
  fullname= fullname.toUpperCase();
   
        // Find user by fullname and password
        const user = await Registration.findOne({ fullname, password });
        if (!user) {
            return res.status(401).send("Check your email and password and try again");
        }
        if (user.role == 'admin') {
            const token = setuser(user);
            const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
            return res.cookie('token', token, { maxAge: oneMonth }).render('admin');
        }
        // Generate token for the user
        const token = setuser(user);
        // Set token as cookie and render the appropriate view
        const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        res.cookie('token', token, { maxAge: oneMonth });

        if (user.coursecode && user.classtype == 'recorded') {
            const cou = user.coursecode.toString();
            switch (cou) {
                case '1':
                    return res.render('1');
                case '2':
                    return res.render('2');
                case '3':
                    return res.render('3');
                default:
                    return res.status(400).send("Invalid course code");
            }


        }
        else{
            res.send("Class type not Match")
        }


    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = routes;
