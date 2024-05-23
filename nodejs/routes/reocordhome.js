const express=require('express')
const routes=express.Router();
const {getuser}=require('../controllers/auth')

routes.get('/',async function(req,res){
const token=req.cookies.token;

if(!token){
    res.render('login')
}

const user=await getuser(token)

if(!user){
    res.render('login')
}


if (user.coursecode && user.classtype == 'recorded') {
    const cou = user.coursecode.toString();
    switch (cou) {
        case '1':
            return res.render('1');
        case '2':
            return res.render('2');
        case '3':
            return res.render('3');
        default:
            return res.status(400).send("Invalid course code");
    }


}
})
module.exports=routes;