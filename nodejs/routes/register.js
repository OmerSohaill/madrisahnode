const express = require('express');
const { register } = require('../models/todo');

const routes = express.Router();

routes.post('/', async function(req, res) {
    try {
        const { name, email, contactnum, coursecode } = req.body;
        const result = new register({ name, email, contactnum, coursecode });
        const savedResult = await result.save(); 
        if(savedResult) {
            res.send(`You successfully Register with Name: ${name} EMAIL: ${email} CONTACTNUM: ${contactnum} COURSECODE: ${coursecode}`);
        } else {
            res.send('You Got some error plz try again later');
        }
    } catch(error) {
        res.send(error);
    }
});

module.exports = routes;
