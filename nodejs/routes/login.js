const express = require('express');
const { Registration } = require('../models/todo');
const routes = express.Router();
const { setuser } = require('../controllers/auth');

routes.post('/', async function(req, res) {
   const { fullname, password } = req.body;
   console.log(fullname, password); // Log the received data

   try {
      const user = await Registration.findOne({ fullname, password });
      if (user && user.coursecode =="1") {
         // Log the found user
         const token = setuser(user);
         // Set cookie
         res.cookie('token', token);
         // Render response
         res.render('yourTemplateName', { user }); // Change 'yourTemplateName' to your actual template name

      } else {
         res.status(401).send("Student with the provided username and password not found");
      }
   } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).send(error);
   }
});

module.exports = routes;
