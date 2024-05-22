const jwt=require('jsonwebtoken')
const secret=("umersohail")

function setuser(user){

    const playload={
        email:user.email,
        id:user.id,
        role:user.role,
        coursecode:user.coursecode,
        classtype:user.classtype
    }
    return jwt.sign(playload,secret);


}

function getuser(token){
    if(!token)return null;
    return jwt.verify(token,secret)


}
function deleteuser(token){
    return jwt.deleteuser(token)
} 
module.exports={
    setuser:setuser,
    getuser:getuser,
    deleteuser:deleteuser
}