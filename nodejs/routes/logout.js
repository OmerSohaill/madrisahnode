const express=require('express')
const routes=express.Router();
routes.get('/',function(req,res){
    
    res.clearCookie('token'); // Assuming token is stored in cookies
    return res.status(200).render('login');

})
routes.post('/',function(req,res){
    const token=req.cookies.token;
    res.clearCookie('token'); // Assuming token is stored in cookies
    return res.status(200).render('login');


})
module.exports=routes;