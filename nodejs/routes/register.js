const express = require('express');
const { register } = require('../models/todo');
const routes = express.Router();
routes.post('/', async function(req, res) {
    try {
    const { name, email, contactnum, recheck,password,coursecode ,online,recorded} = req.body;
        if(online && recorded){
           return res.send("Plz Select Only One type of Classes Online Or Recorded")
        }
        if(!online && !recorded){
            return res.send("Plz Select Any Class You Want Online OR Recorded")
        }
    if (password!=recheck){
            res.send("Your Pass and Confirm Password not match with each other ")
        }
        
        if(recorded){
            const result = new register({ name, email,password, contactnum, coursecode,recorded });
            const savedResult = await result.save(); 
            if(savedResult) {
                res.send(`You successfully Register with Name: ${name} EMAIL: ${email} CONTACTNUM: ${contactnum} COURSECODE: ${coursecode} CLASS TYPE${recorded}`);
            } else {
              res.send('You Got some error plz try again later');
        }
        if(online){

            const result = new register({ name, email,password, contactnum, coursecode,online });
            const savedResult = await result.save(); 
            if(savedResult) {
                res.send(`You successfully Register with Name: ${name} EMAIL: ${email} CONTACTNUM: ${contactnum} COURSECODE: ${coursecode} CLASS TYPE ${online}`);
            } else {
              res.send('You Got some error plz try again later');
        }
       
            
        }
       
    }
    } catch(error) {
        console.log(error)
        res.send(error)
        res.status(500).send('An error occurred while processing your request. Please try again later.');
    }
});

module.exports = routes;
