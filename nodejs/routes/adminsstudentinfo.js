const express = require('express');
const routes = express.Router();
const { Registration } = require('../models/todo');

// POST route to find a student by fullname
routes.post('/', async function(req, res) {
    try {
    let { fullname } = req.body;
     fullname= fullname.toUpperCase()
    // Validate the input
    if (!fullname) {
        return res.status(400).send({ error: "Fullname is required" });
    }

    
        const result = await Registration.findOne({ fullname });
        if (!result) {
            return res.status(404).send({ message: "No student found with this fullname" });
        }
        res.render('studentinfo', { result });
    } catch (error) {
        console.error("Error finding student:", error);
        res.status(500).send({ error: "An error occurred while searching for the student" });
    }
});

// PUT route example (modify as needed)

module.exports = routes;
