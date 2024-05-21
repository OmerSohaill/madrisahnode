const express = require('express');
const routes = express.Router();
const { Registration } = require('../models/todo');

routes.post('/', async function(req, res) {
    try {
    let { fullname, feespaid } = req.body;
   fullname= fullname.toUpperCase();
    if (!fullname) {
        return res.status(400).send({ message: "Full name is required" });
    }
    
        const user = await Registration.findOneAndUpdate(
            { fullname: fullname }, // Filter by fullname
            { $inc: { feespaid: feespaid } }, // Increment feespaid by the provided value
            { new: true } // Return the updated document
        );
        res.status(200).send({ message: 'Fees updated successfully', user: user });
    } catch(error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = routes;
