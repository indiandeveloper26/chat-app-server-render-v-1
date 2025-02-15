
import http from 'http'

import express from 'express';  // Use ES6 import syntax (if "type": "module" is set in package.json)

import { Server } from 'socket.io'; // Importing the Server class from socket.io
import cors from 'cors'
import router from './route/userroute.js';
import { connectDB } from './db.js';







const app = express();


app.use(express.json());

app.use('/saveuser',router)

const server = http.createServer(app);

// Set up CORS to allow connections from your React app
app.use(cors({
  origin: 'http://localhost:3000', // React app is running on this port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Initialize Socket.IO

connectDB()


const io = new Server(server,{
  cors: {
    origin: '*', // Allow only the React app on this port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});



io.on('connection', (socket) => {
console.log('thisi uer ')

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (data) => {
    console.log('Received message:', {'text':data});
    io.emit('private', data);


  });


  socket.on('private', (recipientSocketId, message) => {
    console.log(`Sending private message to ${recipientSocketId}`);
    // io.to(recipientSocketId).emit('message', {
    //   from: clients[socket.id],
    //   message: message
    // });

    console.log('first,',message)
  });



});

app.get('/', (req, res) => {
  res.send('Hello, welcome to my Express app!');
});

// Start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
