const express=require('express')
const routes=express.Router();
const {mes}=require('../models/todo')
routes.get('/',async function(req,res){
    try{

    
    const result=await mes.find();
    console.log(result)
    if(result){
        res.render('message',{result})
    }
    else{
        res.send('Error Plz Try again latter')
    }
    
}catch(error){
    console.log(error)
    res.status(500).send({message:error.message})
}

})
routes.post('/',async function(req,res){
    try{
    const {email,phone,message}=req.body;
    const result=new mes({email,phone,message})
    const results=await result.save()
    if(results){
       return res.status(200).send(`Your message submit succesfully our Team will  response you as soon as possible`)
    }

    else{
        return res.send({message:"ERROR: MESSAGE NOT SUBMIT TRY AGAIN LETTER"})
    }


    }catch(error){
        console.log(error)
        res.status(500).send({message:error.message})
    }

    

})
module.exports=routes;
