const express = require('express');
const { Registration } = require('../models/todo');
const routes = express.Router();

routes.post('/', async function(req, res) {
   const { fullname, password } = req.body;
   console.log(fullname, password); // Log the received data

   try {
      const user = await Registration.findOne({ fullname, password });
      if (user) {
         console.log(user); // Log the found user
         res.send(user);
      } else {
         res.status(401).send("Student with the provided username and password not found");
      }
   } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).send("An error occurred while processing your request");
   }
});

module.exports = routes;
