// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);

// // CORS settings for React Native app
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Allow only the React app on this port
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   }
// });

// // This map holds socket.id to username mapping
// const socketUsernameMap = {};         // socket.id => username
// // This map holds pending messages for users who are offline
// const pendingMessages = {};           // username => [msg, msg...]

// // Socket.IO events
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Event to set username
//   socket.on('setUsername', (username) => {
//     socketUsernameMap[socket.id] = username; // Map socket.id to username
//     socket.username = username; // Save username in socket object
//     console.log('Username set:', username);

//     // Notify everyone that this user is online
//     io.emit('userOnline', { username });

//     // If there are any pending messages for this user, send them now
//     if (pendingMessages[username]) {
//       pendingMessages[username].forEach((msg) => {
//         socket.emit('privateMessage', msg);
//       });
//       // Clear the pending messages for this user
//       delete pendingMessages[username];
//     }

//     socket.emit('usernameSet', `Username ${username} set successfully.`);
//   });

//   // Event to send messages
//   socket.on('sendMessage', (to, message) => {
//     const from = socketUsernameMap[socket.id]; // Get the sender's username
//     const payload = { username: from, message };

//     // Find the recipient's socket.id using their username
//     const recipientSocketId = Object.keys(socketUsernameMap).find(
//       (id) => socketUsernameMap[id] === to
//     );

//     if (recipientSocketId) {
//       // If the recipient is online, send the message to them
//       io.to(recipientSocketId).emit('privateMessage', payload);
//       console.log(`Delivered message from ${from} to ${to}: ${message}`);
//     } else {
//       // If the recipient is offline, store the message
//       console.log(`${to} is offline. Storing message.`);
//       if (!pendingMessages[to]) pendingMessages[to] = [];
//       pendingMessages[to].push(payload);
//     }
//   });

//   // Event on disconnect
//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id]; // Get the disconnected user's username
//     delete socketUsernameMap[socket.id]; // Remove socket.id from the map

//     if (username) {
//       // Notify everyone that the user is offline
//       io.emit('userStatus', { username, isOnline: false });
//       console.log(`User disconnected: ${username}`);
//     }
//   });
// });

// // Start server
// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });




const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }
});

// socket.id => username
const socketUsernameMap = {};

// username => [msg, msg...]
const pendingMessages = {};

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Set username
  socket.on('setUsername', (username) => {
    socketUsernameMap[socket.id] = username;
    socket.username = username;

    console.log('🆔 Username set:', username);
    io.emit('userOnline', { username });

    // Deliver pending messages (if any)
    if (pendingMessages[username]) {
      pendingMessages[username].forEach((msg) => {
        socket.emit('privateMessage', msg);
      });
      delete pendingMessages[username];
    }

    socket.emit('usernameSet', `Username ${username} set successfully.`);
  });

  // Real-time messaging
  socket.on('privateMessage', (payload) => {
    const from = socket.username;
    const { to, message } = payload;

    const fullMessage = {
      username: from,
      to,
      message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    // Find recipient's socket
    const recipientSocketId = Object.keys(socketUsernameMap).find(
      (id) => socketUsernameMap[id] === to
    );

    if (recipientSocketId) {
      // If recipient is online
      io.to(recipientSocketId).emit('privateMessage', fullMessage);
      console.log(`📨 Message sent from ${from} to ${to}: ${message}`);
    } else {
      // Recipient offline — save message
      if (!pendingMessages[to]) pendingMessages[to] = [];
      pendingMessages[to].push(fullMessage);
      console.log(`📥 ${to} is offline. Stored message from ${from}.`);
    }

    // Also emit back to sender so it appears in their chat
    socket.emit('privateMessage', fullMessage);
  });

  // User disconnects
  socket.on('disconnect', () => {
    const username = socketUsernameMap[socket.id];
    delete socketUsernameMap[socket.id];
    if (username) {
      io.emit('userStatus', { username, isOnline: false });
      console.log(`❌ User disconnected: ${username}`);
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
