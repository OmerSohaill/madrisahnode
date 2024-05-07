const express=require('express')
const routes=express.Router();
const { register }=require('../models/todo')
routes.post('/', async function(req, res) {
  const { email, password } = req.body;
  const result = await register.findOne({ email, password });
 
  if (result.coursecode==1 && result.record=='record') {
    res.render("QuranPakHifzRecord")

    // If user is found, send a success response
    return res.status(200).send(result);
  } else {
    // If user is not found, send an error response
    return res.status(404).send('User not found');
  }
});
module.exports=routes;