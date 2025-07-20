



// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   }
// });

// // socket.id => username
// const socketUsernameMap = {};

// // username => [msg, msg...]
// const pendingMessages = {};

// io.on('connection', (socket) => {
//   console.log('✅ User connected:', socket.id);

//   // Set username
//   socket.on('setUsername', (username) => {
//     socketUsernameMap[socket.id] = username;
//     socket.username = username;

//     console.log('🆔 Username set:', username);
//     io.emit('userOnline', { username });

//     // Deliver pending messages (if any)
//     if (pendingMessages[username]) {
//       pendingMessages[username].forEach((msg) => {
//         socket.emit('privateMessage', msg);
//       });
//       delete pendingMessages[username];
//     }

//     socket.emit('usernameSet', `Username ${username} set successfully.`);
//   });

//   // Real-time messaging
//   socket.on('privateMessage', (payload) => {
//     const from = socket.username;
//     const { to, message } = payload;

//     const fullMessage = {
//       username: from,
//       to,
//       message,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit'
//       }),
//     };

//     // Find recipient's socket
//     const recipientSocketId = Object.keys(socketUsernameMap).find(
//       (id) => socketUsernameMap[id] === to
//     );

//     if (recipientSocketId) {
//       // If recipient is online
//       io.to(recipientSocketId).emit('privateMessage', fullMessage);
//       console.log(`📨 Message sent from ${from} to ${to}: ${message}`);
//     } else {
//       // Recipient offline — save message
//       if (!pendingMessages[to]) pendingMessages[to] = [];
//       pendingMessages[to].push(fullMessage);
//       console.log(`📥 ${to} is offline. Stored message from ${from}.`);
//     }

//     // Also emit back to sender so it appears in their chat
//     socket.emit('privateMessage', fullMessage);
//   });

//   // User disconnects
//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     delete socketUsernameMap[socket.id];
//     if (username) {
//       io.emit('userStatus', { username, isOnline: false });
//       console.log(`❌ User disconnected: ${username}`);
//     }
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
























import express from 'express';  
import http from 'http';
import { Server } from 'socket.io'; 
import cors from 'cors';

import router from './route/userroute.js';
import { connectDB } from './db.js';
import routert from './route/test.js';
import { serchroute } from './route/search.js';
import routeget from './route/getuser.js';
import singuproute from './route/singup.js';
import chatlapi from './route/chatlist.js';
import deleterouter from './route/delete.js';
import routedlt from './route/delete.js';
import PendingMessage from './modal/pandingsmm.js';
import loginRoute from './route/loging.js';
import Logingroute from './route/loging.js';
import log from './route/loging.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/', router);
app.use('/test', routert);
app.use('/singup', singuproute);
app.use('/search', serchroute);
app.use('/delete', routedlt);
app.use('/chatlist', chatlapi);
app.use("/log",log)
















app.get('/apitest', (req, res) => {
  res.json({ testingdata: 'sahilinida developer' });
});

// ✅ DB connect
connectDB().then(() => {
  console.log('✅ DB Connected');
}).catch(err => {
  console.error('❌ DB Connection Error:', err);
});

// ✅ Socket maps
const socketUsernameMap = {};
const usernameSocketMap = {};

// ✅ Socket logic
io.on('connection', (socket) => {
  console.log('✅ Socket connected:', socket.id);





  socket.on('setUsername', async (username) => {
    console.log(`🟢 "${username}" linked with socket: ${socket.id}`);
    socketUsernameMap[socket.id] = username;

    if (!usernameSocketMap[username]) {
      usernameSocketMap[username] = [];
    }
    usernameSocketMap[username].push(socket.id);

    // 🔥 Send pending messages
    const pending = await PendingMessage.find({ to: username });
    console.log(`📬 Found ${pending.length} pending for ${username}`);

    for (const msg of pending) {
      socket.emit('privateMessage', msg);
      console.log('📤 Sent pending:', msg);
    }

    await PendingMessage.deleteMany({ to: username });
    console.log(`✅ Deleted ${pending.length} pending for ${username}`);
  });

  socket.on('sendMessage', async ({ from, to, message }) => {
    const payload = { from, to, message };
    console.log(`✉️ ${from} → ${to}: ${message}`);

    const recipientSockets = usernameSocketMap[to];

    if (recipientSockets && recipientSockets.length > 0) {
      recipientSockets.forEach(sockId => {
        io.to(sockId).emit('privateMessage', payload);
      });
      console.log(`📬 Delivered to online ${to}`);
    } else {
      await PendingMessage.create(payload);
      console.log(`💾 Saved for offline ${to}`);
    }

    socket.emit('privateMessage', payload); // echo to sender
  });

  socket.on('typing', ({ from, to }) => {
  const recipientSockets = usernameSocketMap[to];
  if (recipientSockets && recipientSockets.length > 0) {
    recipientSockets.forEach(sockId => {
      io.to(sockId).emit('typing', { from });
    });
    console.log(`✏️ Typing: ${from} → ${to}`);
  }
});


  socket.on('disconnect', () => {
    const username = socketUsernameMap[socket.id];
    console.log(`❌ Socket disconnected: ${socket.id} (${username})`);

    delete socketUsernameMap[socket.id];
    if (username && usernameSocketMap[username]) {
      usernameSocketMap[username] = usernameSocketMap[username].filter(
        id => id !== socket.id
      );
      if (usernameSocketMap[username].length === 0) {
        delete usernameSocketMap[username];
      }
    }
  });
});

// ✅ Start server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
