const express=require('express')
const routes=express.Router();
routes.get('/',function(req,res){
   try{
    const user=req.user;
  
    if(user.role=='admin'){
        return res.render('admin')
    }
    switch(user.coursecode.toString()) {
        case '1':
            return res.render('1');
        case '2':
            return res.render('2');
        case '3':
            return res.render('3');
        default:
            return res.status(400).send("Invalid course code");
    }

   }catch(error){
    res.send(error)
   }

})
module.exports=routes;