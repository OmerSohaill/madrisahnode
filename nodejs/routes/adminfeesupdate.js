const express=require('express')
const routes=express.Router();

routes.post('/',function(req,res){
    const {fullname,feespaid}=req.body;

})
module.exports=routes;