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
//MIDDLE WARE FOR THE COURSE1Login
app.use('/login', async function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next(); // Move to the next middleware if token is not present
  }
  const user = getuser(token);
  if (!user || !user.coursecode=='1') {
    return next(); // Move to the next middleware if user is not present or coursecode does not include 'one'
  }
  // If user is authenticated and coursecode includes 'one', render the view and send response
  return res.render('1');
});


//ALL ROUTES 
const registration=require('./routes/registration');
const login=require('./routes/login')
const logincheck=require('./routes/logcheck')
app.use('/registraion',registration)
app.use('/login',login);
app.use('/logincheck',logincheck)

app.use('/umer',function(req,res){
  res.render('1')
})
// Start the server
app.listen(port, () => {
  console.log('Server is listening on Port', port);
});