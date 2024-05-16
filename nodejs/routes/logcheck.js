const express=require('express')
const routes=express.Router();
routes.get('/',function(req,res){
const token=req.cookies.token;
if(!token){
    res.render('login')
}

})

module.exports=routes;