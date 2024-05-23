const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update with your React app's URL
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3001;

// Middleware
const { setuser, getuser } = require('./controllers/auth');
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Socket.io functions
io.on('connection', (socket) => {
  console.log('Socket id is:', socket.id);

  socket.on('user-message', (message) => {
    console.log('Received message:', message);
    io.emit('new-message', message); // Emit a 'new-message' event to all connected clients
  });
});

// MongoDB connection
const mongoURI = 'mongodb+srv://umer:umer@cluster0.avg1bjf.mongodb.net/railway?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware for authentication
app.use('/login', (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render('login');
  }
  const user = getuser(token);
  if (!user) {
    return res.render('login');
  }
  req.user = user;
  next();
});

app.get('/chat', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

// Routes
const registration = require('./routes/registration');
const login = require('./routes/login');
const loginss = require('./routes/loginss');
const adminsstudentinfo = require('./routes/adminsstudentinfo');
const updatestudentinfo = require('./routes/updatestudentinfo');
const updatefeesstatus = require('./routes/adminfeesupdate');
const contactus = require('./routes/contactus');
const clearCookie = require('./routes/logout');
const recordevent = require('./routes/recordevent');
const recordhome = require('./routes/reocordhome');
app.use('/registration', registration);
app.use('/login', login);
app.use('/loginss', loginss);
app.use('/adminsstudentinfo', adminsstudentinfo);
app.use('/updatestudentinfo', updatestudentinfo);
app.use('/updatefeesstatus', updatefeesstatus);
app.use('/contactus', contactus);
app.use('/logout', clearCookie);
app.use('/recordevent', recordevent);
app.use('/recordhome', recordhome);
// Start the server
server.listen(port, () => {
  console.log('Server is listening on Port', port);
});
