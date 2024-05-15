const express=require('express');

const routes=express.Router();

routes.post('/',function(req,res){
    console.log(req.body)

})

module.exports=routes;