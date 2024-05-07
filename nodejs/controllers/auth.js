const jwt=require('jsonwebtoken')
const secret=("umersohail")

function setuser(user){

    const playload={
        email:user.email,
        id:user.id
    }
    return jwt.sign(playload,sign);


}

function getuser(token){
    if(!token)return null;
    return jwt.verify(token,secret)


}
 
module.exports={
    setuser:setuser,
    getuser:getuser
}