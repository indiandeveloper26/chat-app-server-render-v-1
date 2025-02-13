const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

// Set up CORS to allow connections from your React app
app.use(cors({
  origin: 'http://localhost:3000', // React app is running on this port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Initialize Socket.IO



app.get('/hello',(req,res)=>{


  res.send("hello sahil india")
})



const io = socketIo(server, {
    cors: {
      origin: '*', // Allow only the React app on this port
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
  });

// Socket.IO connection
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

// Start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
