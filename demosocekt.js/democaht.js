
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Change for production
  },
});

app.use(cors());
app.use(express.json());

let users = {}; // userId: socketId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('register', (userId) => {
    users[userId] = socket.id;
    console.log('User registered:', userId);
  });

  socket.on('send-message', (data) => {
    const receiverSocketId = users[data.receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('privateMessage', data);
    }

    // Also send message back to sender for chatlist update
    socket.emit('privateMessage', data);
  });

  socket.on('disconnect', () => {
    // Remove user from list
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 3000');
});
