const express = require('express');
const routes = express.Router();
const { setuser } = require('../controllers/auth');
const { Registration } = require('../models/todo');

routes.post('/', async function(req, res) {
    const { fullname, password } = req.body;

    try {
        // Find user by fullname and password
        const user = await Registration.findOne({ fullname, password });
        if (!user) {
            return res.status(401).send("Check your email and password and try again");
        }

        // Generate token for the user
        const token = setuser(user);

        // Set token as cookie and render the appropriate view
        res.cookie('token', token);

        switch(user.coursecode.toString()) {
            case '1':
                return res.render('1');
            case '2':
                return res.render('2');
            case '3':
                return res.render('3');
            default:
                return res.status(400).send("Invalid course code");
        }

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = routes;
