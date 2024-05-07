const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;
// Middleware
const {setuser,getuser}=require('./controllers/auth')
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MongoDB connection
const mongoURI = 'mongodb+srv://umer:umer@cluster0.avg1bjf.mongodb.net/railway?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//ALL MIDDLEWARES
app.use('/login',async function(req,res,next){
  const token=req.cookies.token;
  if(!token){
    res.render('login')
  }
  const user=await getuser(token);
  if(!user){
    res.render('login')
  }

  
})
//ALL ROUTES 
const register=require('./routes/register')
const login=require('./routes/checklogin')

app.use('/register',register);
app.use('/checklogin',login)

// Start the server
app.listen(port, () => {
  console.log('Server is listening on Port', port);
});