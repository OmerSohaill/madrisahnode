const express = require('express')
const routes = express.Router();
routes.get('/', function (req, res) {
    try {
        const user = req.user;


        if (user.role == 'admin') {
            return res.render('admin')
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
        else { 
            res.status('404').send({message:"Class Type Not Found"})
        }

    } catch (error) {
        res.send(error)
    }

})
module.exports = routes;