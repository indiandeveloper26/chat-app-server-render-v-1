










// import express from 'express';  
// import http from 'http';
// import { Server } from 'socket.io'; 
// import cors from 'cors';

// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import routeget from './route/getuser.js';
// import singuproute from './route/singup.js';
// import chatlapi from './route/chatlist.js';
// import deleterouter from './route/delete.js';
// import routedlt from './route/delete.js';
// import PendingMessage from './modal/pandingsmm.js';










// const app = express();


// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/chatlist', chatlapi);

// app.get('/apitest', (req, res) => {
//   res.json({ testingdata: 'sahilinida developer' });
// });

// try {
//   connectDB();
// } catch (error) {
//   console.log('DB Connection Error:', error);
// }
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// app.use(cors());
// app.use(express.json());

// // ✅ Store socket => username mapping
// const socketUsernameMap = {};
// // ✅ And username => [socketId] mapping for multiple device support
// const usernameSocketMap = {};

// io.on('connection', (socket) => {
//   console.log('✅ Socket connected:', socket.id);

//   // ✅ Client sets username
//   socket.on('setUsername', async (username) => {
//     console.log(`User "${username}" connected with socket ${socket.id}`);

//     socketUsernameMap[socket.id] = username;

//     // For multiple device support:
//     if (!usernameSocketMap[username]) {
//       usernameSocketMap[username] = [];
//     }
//     usernameSocketMap[username].push(socket.id);

//     // ✅ 1. Check DB for pending messages
//     const pending = await PendingMessage.find({ to: username });

//     // ✅ 2. Send all pending messages to this socket
//     for (const msg of pending) {
//       socket.emit('privateMessage', msg);

//       console.log('mess',msg)
//     }

//     // ✅ 3. Delete all sent
//     await PendingMessage.deleteMany({ to: username });

//     console.log(`✅ Delivered ${pending.length} pending messages to "${username}"`);
//   });

//   // ✅ Send message event
//   socket.on('sendMessage', async ({ from, to, message }) => {
//     console.log(`Message from ${from} to ${to}: ${message}`);
//     const payload = { from, to, message };

//     // ✅ Find recipient socket(s)
//     const recipientSocketIds = usernameSocketMap[to];

//     if (recipientSocketIds && recipientSocketIds.length > 0) {
//       // ✅ Recipient online: send to all their active sockets
//       recipientSocketIds.forEach((sockId) => {
//         io.to(sockId).emit('privateMessage', payload);
//       });
//     } else {
//       // ✅ Recipient offline: save in DB
//       await PendingMessage.create(payload);
//       console.log(`Saved pending message for offline user: ${to}`);
//     }

//     // ✅ Echo back to sender too (for instant UI update)
//     socket.emit('privateMessage', payload);
//   });

//   // ✅ Disconnect cleanup
//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     console.log(`Socket disconnected: ${socket.id} (${username})`);

//     // Remove from both maps
//     delete socketUsernameMap[socket.id];
//     if (username && usernameSocketMap[username]) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(
//         (id) => id !== socket.id
//       );
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//   });
// });

// // ✅ REST route

// // ✅ DB connect

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
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
