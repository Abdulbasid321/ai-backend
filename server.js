
// const express = require('express');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const http = require('http');           // <-- add http module
// const { Server } = require('socket.io'); // <-- add socket.io Server

// // import your route modules
// const studentRoutes    = require('./src/routes/student.routes');

// // connect to database
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/zibeh';
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch(err => console.error('❌ MongoDB connection error:', err));

// const app = express();

// // Create the HTTP server and pass Express app
// const server = http.createServer(app);

// // Create socket.io server and attach it to the HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:3000', 'http://localhost:3001'],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// // Socket.io events
// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   socket.on('joinRoom', ({ studentName }) => {
//     console.log(`${studentName} joined the chat`);
//     // optionally join room(s)
//     // socket.join('someRoom');
//   });

//   socket.on('chatMessage', ({ senderName, message }) => {
//     const msgObj = {
//       senderName,
//       message,
//       timestamp: new Date(),
//     };
//     // Broadcast to all clients
//     io.emit('newMessage', msgObj);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });

// // middleware
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'],
//   credentials: true
// }));
// app.use(cookieParser());
// app.use(passport.initialize());

// // serve static assets (if any)
// app.use(express.static('public'));

// // view engine (if needed)
// app.set('view engine', 'ejs');

// // GridFS setup (optional)
// let gfs;
// mongoose.connection.once('open', () => {
//   gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     bucketName: 'uploads'
//   });
// });

// // root route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the API' });
// });

// // mount route handlers with base paths
// app.use('/students',    studentRoutes);
// app.use('/departments', departmentRoutes);
// app.use('/semesters',   semesterRoutes);
// app.use('/departments', departmentRoutes);
// app.use('/admin',       adminRoutes);
// app.use('/message',     messageRoutes);
// app.use('/courses',     courses);
// app.use('/lecturers',     lecturers);

// // start server using the HTTP server, not app.listen
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// module.exports = app;


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const symptomRoutes = require('./src/routes/symptom.routes');
// const MONGO_URI = 'mongodb://127.0.0.1:27017/checker';
const MONGO_URI = 'mongodb+srv://abdulbasidhussain:abdul123@cluster0.yflxqwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/symptoms', symptomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
