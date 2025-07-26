



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
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// // ✅ Middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/chatlist', chatlapi);

// app.get('/apitest', (req, res) => {
//   res.json({ testingdata: 'sahilinida developer' });
// });

// // ✅ DB connect
// connectDB().then(() => {
//   console.log('✅ DB Connected');
// }).catch(err => {
//   console.error('❌ DB Connection Error:', err);
// });

// // ✅ Socket maps
// const socketUsernameMap = {};
// const usernameSocketMap = {};

// // ✅ Socket logic
// io.on('connection', (socket) => {
//   console.log('✅ Socket connected:', socket.id);





//   socket.on('setUsername', async (username) => {
//     console.log(`🟢 "${username}" linked with socket: ${socket.id}`);
//     socketUsernameMap[socket.id] = username;

//     if (!usernameSocketMap[username]) {
//       usernameSocketMap[username] = [];
//     }
//     usernameSocketMap[username].push(socket.id);

//     // 🔥 Send pending messages
//     const pending = await PendingMessage.find({ to: username });
//     console.log(`📬 Found ${pending.length} pending for ${username}`);

//     for (const msg of pending) {
//       socket.emit('privateMessage', msg);
//       console.log('📤 Sent pending:', msg);
//     }

//     await PendingMessage.deleteMany({ to: username });
//     console.log(`✅ Deleted ${pending.length} pending for ${username}`);
//   });

//   socket.on('sendMessage', async ({ from, to, message }) => {
//     const payload = { from, to, message };
//     console.log(`✉️ ${from} → ${to}: ${message}`);

//     const recipientSockets = usernameSocketMap[to];

//     if (recipientSockets && recipientSockets.length > 0) {
//       recipientSockets.forEach(sockId => {
//         io.to(sockId).emit('privateMessage', payload);
//       });
//       console.log(`📬 Delivered to online ${to}`);
//     } else {
//       await PendingMessage.create(payload);
//       console.log(`💾 Saved for offline ${to}`);
//     }

//     socket.emit('privateMessage', payload); // echo to sender
//   });

//   socket.on('typing', ({ from, to }) => {
//   const recipientSockets = usernameSocketMap[to];
//   if (recipientSockets && recipientSockets.length > 0) {
//     recipientSockets.forEach(sockId => {
//       io.to(sockId).emit('typing', { from });
//     });
//     console.log(`✏️ Typing: ${from} → ${to}`);
//   }
// });


//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     console.log(`❌ Socket disconnected: ${socket.id} (${username})`);

//     delete socketUsernameMap[socket.id];
//     if (username && usernameSocketMap[username]) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(
//         id => id !== socket.id
//       );
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//   });
// });

// // ✅ Start server
// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });















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
// import Message from './modal/seen.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// app.use(cors());
// app.use(express.json());

// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/chatlist', chatlapi);

// app.get('/apitest', (req, res) => {
//   res.json({ testingdata: 'sahilinida developer' });
// });

// connectDB().then(() => {
//   console.log('✅ DB Connected');
// }).catch(err => {
//   console.error('❌ DB Connection Error:', err);
// });

// const socketUsernameMap = {};
// const usernameSocketMap = {};

// io.on('connection', (socket) => {
//   console.log('✅ Socket connected:', socket.id);

//   socket.on('setUsername', async (username) => {
//     console.log(`🟢 "${username}" linked with socket: ${socket.id}`);
//     socketUsernameMap[socket.id] = username;

//     if (!usernameSocketMap[username]) {
//       usernameSocketMap[username] = [];
//     }
//     usernameSocketMap[username].push(socket.id);

//     const pending = await PendingMessage.find({ to: username });
//     console.log(`📬 Found ${pending.length} pending for ${username}`);

//     for (const msg of pending) {
//       socket.emit('privateMessage', msg);
//     }

//     await PendingMessage.deleteMany({ to: username });
//   });
//   socket.on('markAsRead', async ({ from, to }) => {
//   try {
//     // Mark all messages from `to` to `from` as read
//     await Message.updateMany(
//       { from: to, to: from, isRead: false }, // condition
//       { $set: { isRead: true } } // update
//     );

//     console.log(`✅ Marked messages from ${to} to ${from} as READ`);
//   } catch (err) {
//     console.error('❌ markAsRead error:', err);
//   }
// });


// socket.on("seen",(Data)=>{
//   console.log('dta',Data)
// })


// //  socket.on('privateMessage', (payload) => {
// //     const { from, to } = payload;

// //     // ✅ Example: usernameSocketMap = { username: [socketId1, socketId2] }
// //     const recipientSockets = usernameSocketMap[to];
// //     if (recipientSockets && recipientSockets.length > 0) {
// //       recipientSockets.forEach(sockId => {
// //         io.to(sockId).emit('privateMessage', payload);
// //       });
// //     }

// //     // ✅ Important: DO NOT send back to sender!
// //     // Otherwise duplicate!
// //   });

//   // socket.on('typing', ({ from, to }) => {
//   //   const recipientSockets = usernameSocketMap[to];
//   //   if (recipientSockets && recipientSockets.length > 0) {
//   //     recipientSockets.forEach(sockId => {
//   //       io.to(sockId).emit('typing', { from });
//   //     });
//   //   }
//   // });
// socket.on('privateMessage', (payload) => {
//   const { from, to } = payload;

//   const fromSockets = usernameSocketMap[from] || [];
//   const toSockets = usernameSocketMap[to] || [];

//   [...new Set([...fromSockets, ...toSockets])].forEach(sockId => {
//     io.to(sockId).emit('privateMessage', payload);
//   });
// });

//   socket.on('typing', ({ from, to, typing }) => {
//   const recipientSockets = usernameSocketMap[to];
//   if (recipientSockets && recipientSockets.length > 0) {
//     recipientSockets.forEach(sockId => {
//       io.to(sockId).emit('typing', { from, typing }); // typing: true/false
//     });
//   }
// });

//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     delete socketUsernameMap[socket.id];
//     if (username && usernameSocketMap[username]) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(
//         id => id !== socket.id
//       );
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });













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
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// // ✅ Middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/chatlist', chatlapi);

// app.get('/apitest', (req, res) => {
//   res.json({ testingdata: 'sahilinida developer' });
// });

// // ✅ DB connect
// connectDB().then(() => {
//   console.log('✅ DB Connected');
// }).catch(err => {
//   console.error('❌ DB Connection Error:', err);
// });

// // ✅ Socket maps
// const socketUsernameMap = {};
// const usernameSocketMap = {};

// // ✅ Socket logic
// io.on('connection', (socket) => {
//   console.log('✅ Socket connected:', socket.id);





//   socket.on('setUsername', async (username) => {
//     console.log(`🟢 "${username}" linked with socket: ${socket.id}`);
//     socketUsernameMap[socket.id] = username;

//     if (!usernameSocketMap[username]) {
//       usernameSocketMap[username] = [];
//     }
//     usernameSocketMap[username].push(socket.id);

//     // 🔥 Send pending messages
//     const pending = await PendingMessage.find({ to: username });
//     console.log(`📬 Found ${pending.length} pending for ${username}`);

//     for (const msg of pending) {
//       socket.emit('privateMessage', msg);
//       console.log('📤 Sent pending:', msg);
//     }

//     await PendingMessage.deleteMany({ to: username });
//     console.log(`✅ Deleted ${pending.length} pending for ${username}`);
//   });

//   socket.on('sendMessage', async ({ from, to, message }) => {
//     const payload = { from, to, message };
//     console.log(`✉️ ${from} → ${to}: ${message}`);

//     const recipientSockets = usernameSocketMap[to];

//     if (recipientSockets && recipientSockets.length > 0) {
//       recipientSockets.forEach(sockId => {
//         io.to(sockId).emit('privateMessage', payload);
//       });
//       console.log(`📬 Delivered to online ${to}`);
//     } else {
//       await PendingMessage.create(payload);
//       console.log(`💾 Saved for offline ${to}`);
//     }

//     socket.emit('privateMessage', payload); // echo to sender
//   });

//   socket.on('typing', ({ from, to }) => {
//   const recipientSockets = usernameSocketMap[to];
//   if (recipientSockets && recipientSockets.length > 0) {
//     recipientSockets.forEach(sockId => {
//       io.to(sockId).emit('typing', { from });
//     });
//     console.log(`✏️ Typing: ${from} → ${to}`);
//   }
// });


//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     console.log(`❌ Socket disconnected: ${socket.id} (${username})`);

//     delete socketUsernameMap[socket.id];
//     if (username && usernameSocketMap[username]) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(
//         id => id !== socket.id
//       );
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//   });
// });

// // ✅ Start server
// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });









// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';

// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import singuproute from './route/singup.js';
// import chatlapi from './route/chatlist.js';
// import routedlt from './route/delete.js';
// import PendingMessage from './modal/pandingsmm.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/chatlist', chatlapi);

// app.get('/apitest', (req, res) => {
//   res.json({ testingdata: 'sahilinida developer' });
// });

// // ✅ DB connect
// connectDB()
//   .then(() => console.log('✅ DB Connected'))
//   .catch(err => console.error('❌ DB Connection Error:', err));

// // ✅ Socket maps
// const socketUsernameMap = {};
// const usernameSocketMap = {};

// // ✅ Socket logic
// io.on('connection', (socket) => {
//   console.log('✅ Socket connected:', socket.id);

//   // 🟢 Join user with socket
//   socket.on('setUsername', async (username) => {
//     console.log(`🟢 "${username}" linked with socket: ${socket.id}`);
//     socketUsernameMap[socket.id] = username;

//     if (!usernameSocketMap[username]) {
//       usernameSocketMap[username] = [];
//     }
//     usernameSocketMap[username].push(socket.id);

//     // ✅ Send pending messages
//     const pending = await PendingMessage.find({ to: username });
//     console.log(`📬 Found ${pending.length} pending for ${username}`);

//     for (const msg of pending) {
//       socket.emit('privateMessage', msg);
//       console.log('📤 Sent pending:', msg);
//     }

//     await PendingMessage.deleteMany({ to: username });
//     console.log(`✅ Deleted ${pending.length} pending for ${username}`);
//   });

//   // ✅ Send message
//   socket.on('sendMessage', async ({ from, to, message }) => {
//     const payload = { from, to, message };
//     console.log(`✉️ ${from} → ${to}: ${message}`);

//     const recipientSockets = usernameSocketMap[to];

//     if (recipientSockets && recipientSockets.length > 0) {
//       // ✅ Online → Direct send
//       recipientSockets.forEach(sockId => {
//         io.to(sockId).emit('privateMessage', payload);
//       });

//       console.log(`📬 Delivered to online user: ${to}`);

//     } else {
//       // ✅ Offline → Save only, don't send
//       await PendingMessage.create(payload);
//       console.log(`💾 ${to} is OFFLINE — saved to DB`);
//     }

//     // ✅ Echo back to sender always
//     socket.emit('privateMessage', payload);
//   });

//   // ✅ Typing indicator
//   socket.on('typing', ({ from, to }) => {
//     const recipientSockets = usernameSocketMap[to];
//     if (recipientSockets && recipientSockets.length > 0) {
//       recipientSockets.forEach(sockId => {
//         io.to(sockId).emit('typing', { from });
//       });
//       console.log(`✏️ Typing: ${from} → ${to}`);
//     }
//   });

//   // ✅ Disconnect
//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     console.log(`❌ Socket disconnected: ${socket.id} (${username})`);

//     delete socketUsernameMap[socket.id];
//     if (username && usernameSocketMap[username]) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(
//         id => id !== socket.id
//       );
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//   });
// });

// // ✅ Start server
// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });




// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';

// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import singuproute from './route/singup.js';
// import chatlapi from './route/chatlist.js';
// import routedlt from './route/delete.js';
// import PendingMessage from './modal/pandingsmm.js';
// import infinite from './route/infinite.js';

// // ✅ Express App + HTTP Server
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/chatlist', chatlapi);
// app.use('/infinite', infinite);
// // ✅ Test API
// app.get('/apitest', (req, res) => {
//   res.json({ status: 'Server is running 👌' });
// });

// // ✅ DB connect
// connectDB()
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:'));

// // ✅ Socket Maps
// const socketUsernameMap = {};   // socket.id → username
// const usernameSocketMap = {};   // username → [socket.id, socket.id, ...]

// // ✅ Socket.io logic
// io.on('connection', (socket) => {
//   console.log('🔗 New Socket Connected:', socket.id);

//   // 👉 Username set karo aur pending bhejo
//   socket.on('setUsername', async (username) => {
//     console.log(`🟢 User "${username}" joined: ${socket.id}`);
//     socketUsernameMap[socket.id] = username;

//     if (!usernameSocketMap[username]) usernameSocketMap[username] = [];
//     usernameSocketMap[username].push(socket.id);

//     // ✅ Pending messages bhejo
//     const pending = await PendingMessage.find({ to: username });
//     console.log(`📦 Pending for ${username}: ${pending.length}`);

//     for (const msg of pending) {
//       socket.emit('privateMessage', msg);
//       console.log('📤 Sent pending:', msg);
//     }

//     await PendingMessage.deleteMany({ to: username });
//     console.log(`✅ Cleared pending for ${username}`);
//   });

//   // 👉 Message bhejo
//   // socket.on('sendMessage', async ({ from, to, message, timestamp }) => {
//   //   const payload = { from, to, message, timestamp };
//   //   console.log(`✉️ send ${from} → ${to}: ${message}`);

//   //   const recipientSockets = usernameSocketMap[to];
//   //   if (recipientSockets && recipientSockets.length > 0) {
//   //     recipientSockets.forEach(id => io.to(id).emit('privateMessage', payload));
//   //     console.log(`📬 Delivered to ${to}`);
//   //   } else {
//   //     await PendingMessage.create(payload);
//   //     console.log(`💾 ${to} offline → saved`);
//   //   }

//   //   // ✅ Sender ko bhi bhejo
//   //   const senderSockets = usernameSocketMap[from];
//   //   if (senderSockets && senderSockets.length > 0) {
//   //     senderSockets.forEach(id => io.to(id).emit('privateMessage', payload));
//   //   }
//   // });
// // ✅ Message bhejo:
// socket.on('sendMessage', async ({ from, to, message, timestamp }) => {
//   const payload = { from, to, message, timestamp };
//   console.log(`✉️ ${from} → ${to}: ${message}`);

//   // ✅ Sirf recipient ko bhejo:
//   const recipientSockets = usernameSocketMap[to];
//   if (recipientSockets && recipientSockets.length > 0) {
//     recipientSockets.forEach(id => io.to(id).emit('privateMessage', payload));
//     console.log(`📬 Delivered to ${to}`);
//   } else {
//     await PendingMessage.create(payload);
//     console.log(`💾 ${to} offline → saved`);
//   }

//   // ❌ Sender ko dubara mat bhejo.
// });

//   // 👉 Typing indicator
//   socket.on('typing', ({ from, to }) => {
//     const recipientSockets = usernameSocketMap[to];
//     if (recipientSockets && recipientSockets.length > 0) {
//       recipientSockets.forEach(id => io.to(id).emit('typing', { from }));
//       console.log(`✏️ Typing: ${from} → ${to}`);
//     }
//   });

//   // 👉 Disconnect
//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     console.log(`❌ Disconnected: ${socket.id} (${username})`);

//     delete socketUsernameMap[socket.id];

//     if (username && usernameSocketMap[username]) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(id => id !== socket.id);
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//   });
// });

// // ✅ Start Server
// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });






















// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';

// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import singuproute from './route/singup.js';
// import chatlapi from './route/chatlist.js';
// import routedlt from './route/delete.js';
// import PendingMessage from './modal/pandingsmm.js';
// import infinite from './route/infinite.js';
// import log from './route/loging.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// app.use(cors());
// app.use(express.json());

// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/log', log);
// app.use('/chatlist', chatlapi);
// app.use('/infinite', infinite);

// app.get('/apitest', (req, res) => {
//   res.json({ status: 'Server is running 👌' });
// });

// connectDB().then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// const socketUsernameMap = {};
// const usernameSocketMap = {};

// io.on('connection', (socket) => {
//   console.log('🔗 New Socket Connected:', socket.id);

//   socket.on('setUsername', async (username) => {

//     console.log('userconnected',username)
//     socketUsernameMap[socket.id] = username;
//     if (!usernameSocketMap[username]) usernameSocketMap[username] = [];
//     usernameSocketMap[username].push(socket.id);

//     const pending = await PendingMessage.find({ to: username });
//     pending.forEach(msg => socket.emit('privateMessage', msg));
//     await PendingMessage.deleteMany({ to: username });
//   });

//   socket.on('sendMessage', async ({ from, to, message, timestamp }) => {
//     const payload = { from, to, message, timestamp };
//     const recipientSockets = usernameSocketMap[to];
//     if (recipientSockets && recipientSockets.length > 0) {
//       console.log('mess sent to ',to,message,from)
//       recipientSockets.forEach(id => io.to(id).emit('privateMessage', payload));
//     } else {
//       await PendingMessage.create(payload);
//     }
//     // ❌ Sender ko dobara nahi bhej rahe!
//   });

//   socket.on('typing', ({ from, to }) => {
//     const recipientSockets = usernameSocketMap[to];
//     if (recipientSockets) {
//       recipientSockets.forEach(id => io.to(id).emit('typing', { from }));
//     }
//   });

//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     delete socketUsernameMap[socket.id];
//     if (username) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(id => id !== socket.id);
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



















// // server.js
// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import singuproute from './route/singup.js';
// import chatlapi from './route/chatlist.js';
// import routedlt from './route/delete.js';
// import PendingMessage from './modal/pandingsmm.js';
// import infinite from './route/infinite.js';
// import log from './route/loging.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// app.use(cors());
// app.use(express.json());

// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/log', log);
// app.use('/chatlist', chatlapi);
// app.use('/infinite', infinite);

// app.get('/apitest', (req, res) => {
//   res.json({ status: 'Server is running 👌' });
// });

// connectDB().then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// // ✅ Socket Maps
// const socketUsernameMap = {};
// const usernameSocketMap = {};

// io.on('connection', (socket) => {
//   console.log('🔗 New Socket Connected:', socket.id);

//   socket.on('setUsername', async (username) => {
//     console.log(`✅ User connected: ${username}`);

//     socketUsernameMap[socket.id] = username;

//     if (!usernameSocketMap[username]) usernameSocketMap[username] = [];
//     usernameSocketMap[username].push(socket.id);

//     // Pending messages
//     const pending = await PendingMessage.find({ to: username });
//     pending.forEach(msg => socket.emit('privateMessage', msg));
//     await PendingMessage.deleteMany({ to: username });
//   });

//   socket.on('sendMessage', async ({ from, to, message, timestamp }) => {
//     const payload = { from, to, message, timestamp };
//     const recipientSockets = usernameSocketMap[to];
//     if (recipientSockets && recipientSockets.length > 0) {
//       console.log(`📤 ${from} ➡️ ${to} : ${message}`);
//       recipientSockets.forEach(id => io.to(id).emit('privateMessage', payload));
//     } else {
//       console.log(`💾 Stored pending for ${to}: ${message}`);
//       await PendingMessage.create(payload);
//     }
//   });

//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     delete socketUsernameMap[socket.id];
//     if (username) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(id => id !== socket.id);
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//     console.log(`❌ Socket Disconnected: ${socket.id} (${username})`);
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });






















// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';

// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import singuproute from './route/singup.js';
// import chatlapi from './route/chatlist.js';
// import routedlt from './route/delete.js';
// import PendingMessage from './modal/pandingsmm.js';
// import infinite from './route/infinite.js';
// import log from './route/loging.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// app.use(cors());
// app.use(express.json());

// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/log', log);
// app.use('/chatlist', chatlapi);
// app.use('/infinite', infinite);

// app.get('/apitest', (req, res) => {
//   res.json({ status: 'Server is running 👌' });
// });

// connectDB().then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// const socketUsernameMap = {};
// const usernameSocketMap = {};

// io.on('connection', (socket) => {
//   console.log('🔗 New Socket Connected:', socket.id);

//   socket.on('setUsername', async (username) => {
//     console.log('✅ User connected:', username);
//     socketUsernameMap[socket.id] = username;
//     if (!usernameSocketMap[username]) usernameSocketMap[username] = [];
//     usernameSocketMap[username].push(socket.id);

//     const pending = await PendingMessage.find({ to: username });
//     pending.forEach(msg => socket.emit('privateMessage', msg));
//     await PendingMessage.deleteMany({ to: username });
//   });

//   socket.on('sendMessage', async ({ from, to, message, timestamp }) => {
//     const payload = { from, to, message, timestamp };
//     const recipientSockets = usernameSocketMap[to];
//     if (recipientSockets && recipientSockets.length > 0) {
//       console.log(`📤 Message sent to ${to}: ${message}`);
//       recipientSockets.forEach(id => io.to(id).emit('privateMessage', payload));
//     } else {
//       await PendingMessage.create(payload);
//     }
//   });

//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     delete socketUsernameMap[socket.id];
//     if (username) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(id => id !== socket.id);
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//       }
//     }
//     console.log('❌ Disconnected:', socket.id);
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });














// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';

// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import singuproute from './route/singup.js';
// import chatlapi from './route/chatlist.js';
// import routedlt from './route/delete.js';
// import PendingMessage from './modal/pandingsmm.js';
// import infinite from './route/infinite.js';
// import log from './route/loging.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

// app.use(cors());
// app.use(express.json());

// app.use('/', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delete', routedlt);
// app.use('/log', log);
// app.use('/chatlist', chatlapi);
// app.use('/infinite', infinite);

// app.get('/apitest', (req, res) => {
//   res.json({ status: 'Server is running 👌' });
// });

// connectDB().then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// const socketUsernameMap = {};
// const usernameSocketMap = {};

// io.on('connection', (socket) => {
//   console.log(`🔗 Connected: ${socket.id}`);

//   socket.on('setUsername', async (username) => {
//     socket.username = username;

//     if (!usernameSocketMap[username]) usernameSocketMap[username] = [];
//     usernameSocketMap[username].push(socket.id);

//     console.log(`✅ ${username} is online`);

//     // Broadcast online status
//     io.emit('userStatus', { username, online: true });

//     // Send pending msgs
//     const pending = await PendingMessage.find({ to: username });
//     if (pending.length) {
//       pending.forEach(m => socket.emit('privateMessage', m));
//       await PendingMessage.deleteMany({ to: username });
//     }
//   });

//   socket.on('typing', ({ from, to }) => {
//     const recvs = usernameSocketMap[to] || [];
//     recvs.forEach(id => io.to(id).emit('typing', { from }));
//   });

//   socket.on('sendMessage', async ({ from, to, message, timestamp }) => {
//     const payload = { from, to, message, timestamp };
//     const recvs = usernameSocketMap[to] || [];
//     if (recvs.length) {
//       recvs.forEach(id => io.to(id).emit('privateMessage', payload));
//     } else {
//       await PendingMessage.create(payload);
//     }
//   });

//   socket.on('disconnect', () => {
//     const username = socket.username;
//     console.log(`❌ Disconnected: ${socket.id} (${username})`);

//     if (username && usernameSocketMap[username]) {
//       usernameSocketMap[username] = usernameSocketMap[username].filter(id => id !== socket.id);
//       if (usernameSocketMap[username].length === 0) {
//         delete usernameSocketMap[username];
//         io.emit('userStatus', { username, online: false });
//       }
//     }
//   });
// });

// server.listen(4000, () => console.log(`🚀 Server at http://localhost:4000`));

















import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectDB } from './db.js';
import PendingMessage from './modal/pandingsmm.js';

// ------ Routes ------
import router from './route/userroute.js';
import routert from './route/test.js';
import { serchroute } from './route/search.js';
import singuproute from './route/singup.js';
import chatlapi from './route/chatlist.js';
import routedlt from './route/delete.js';
import infinite from './route/infinite.js';
import log from './route/loging.js';
import loginRoute from './route/loging.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());

app.use('/', router);
app.use('/test', routert);
app.use('/singup', singuproute);
app.use('/search', serchroute);
app.use('/delete', routedlt);
app.use('/log', loginRoute);
app.use('/chatlist', chatlapi);
app.use('/infinite', infinite);

app.get('/apitest', (req, res) => {
  res.json({ status: 'Server is running 👌' });
});

connectDB().then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const usernameSocketMap = {};

io.on('connection', (socket) => {
  console.log(`🔗 Connected: ${socket.id}`);

  socket.on('setUsername', async (username) => {
    socket.username = username;

    if (!usernameSocketMap[username]) usernameSocketMap[username] = [];
    usernameSocketMap[username].push(socket.id);

    console.log(`✅ ${username} is online`);

    io.emit('userStatus', { username, online: true });

    const pending = await PendingMessage.find({ to: username });
    if (pending.length) {
      pending.forEach(m => socket.emit('privateMessage', m));
      await PendingMessage.deleteMany({ to: username });
    }
  });

  socket.on('typing', ({ from, to }) => {
    const recvs = usernameSocketMap[to] || [];
    recvs.forEach(id => io.to(id).emit('typing', { from }));
  });

  socket.on('sendMessage', async ({ id, from, to, message, timestamp, seen }) => {
    const payload = { id, from, to, message, timestamp, seen: false };

    const recvs = usernameSocketMap[to] || [];
    if (recvs.length) {
      recvs.forEach(id => io.to(id).emit('privateMessage', payload));
    } else {
      await PendingMessage.create(payload);
    }

    // ALSO send back to sender for consistency
    const senders = usernameSocketMap[from] || [];
    senders.forEach(id => io.to(id).emit('privateMessage', payload));
  });

  // ✅ SEEN FEATURE
  socket.on('seen', ({ from, to, ids }) => {
    // console.log(`🔵 Seen by ${from} for ${to}: ${ids}`);
    const recvs = usernameSocketMap[to] || [];
    recvs.forEach(id => {
      io.to(id).emit('messageSeen', { from, to, ids });
    });
  });

  socket.on('disconnect', () => {
    const username = socket.username;
    console.log(`❌ Disconnected: ${socket.id} (${username})`);

    if (username && usernameSocketMap[username]) {
      usernameSocketMap[username] = usernameSocketMap[username].filter(id => id !== socket.id);
      if (usernameSocketMap[username].length === 0) {
        delete usernameSocketMap[username];
        io.emit('userStatus', { username, online: false });
      }
    }
  });
});

server.listen(4000, () => console.log(`🚀 Server at http://localhost:4000`));
