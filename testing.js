




import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// IMPORT ROUTES AND DB CONNECTION
// const router = require('./route/userroute');

import { connectDB } from './db.js';


const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// API routes
// app.use('/saveuser', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delate', derouter);
// app.use('/alluserget', routeget);

app.get('/apitest', (req, res) => {
  res.json({ tstingdata: 'sahilinida developer' });
});

app.get('/', (req, res) => {
  res.json({ tstingdata: 'server running fine' });
});

// Connect to MongoDB (or whichever DB you're using)
connectDB();

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow from all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

// Store mappings and messages
const socketUsernameMap = {};         // socket.id => username
const pendingMessages = {};           // username => [msg, msg...]

// Socket.IO events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Set username
  socket.on('setUsername', (username) => {
    socketUsernameMap[socket.id] = username;
    socket.username = username;

    io.emit('userStatus', { username, isOnline: true });
    console.log(`User online: ${username}`);

    // Send any pending messages
    if (pendingMessages[username]) {
      pendingMessages[username].forEach((msg) => {
        socket.emit('privateMessage', msg);
      });
      delete pendingMessages[username];
    }

    socket.emit('usernameSet', `Username ${username} set successfully.`);
  });

  // Send message
  socket.on('sendMessage', (to, message) => {
    const from = socketUsernameMap[socket.id];
    const payload = { username: from, message };

    const recipientSocketId = Object.keys(socketUsernameMap).find(
      (id) => socketUsernameMap[id] === to
    );

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('privateMessage', payload);
      console.log(`Delivered message from ${from} to ${to}: ${message}`);
    } else {
      console.log(`${to} is offline. Storing message.`);
      if (!pendingMessages[to]) pendingMessages[to] = [];
      pendingMessages[to].push(payload);
    }
  });

  // On disconnect
  socket.on('disconnect', () => {
    const username = socketUsernameMap[socket.id];
    delete socketUsernameMap[socket.id];

    if (username) {
      io.emit('userStatus', { username, isOnline: false });
      console.log(`User disconnected: ${username}`);
    }
  });
});

// Start server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
