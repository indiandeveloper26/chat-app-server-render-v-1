


// import express from 'express';  // Use ES6 import syntax (if "type": "module" is set in package.json)

// import { Server } from 'socket.io'; // Importing the Server class from socket.io
// import cors from 'cors'
// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import http from 'http'
// import { serchroute } from './route/search.js';
// import derouter from './route/delete.js';
// import routeget from './route/getuser.js';
// import singuproute from './route/singup.js';







// const app = express();

// app.use(cors())
// app.use(express.json());

// app.use('/saveuser',router)
// app.use('/test',routert)
// app.use('/singup',singuproute)
// app.use('/search',serchroute)
// app.use('/delate',derouter)
// app.use('/alluserget',routeget)


// // Set up CORS to allow connections from your React app
// app.use(cors({
//   origin: 'http://localhost:3000', // React app is running on this port
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// // Initialize Socket.IO
// app.get('/apitest',(req,res)=>{
//   res.json({"tstingdata":"sahilinida devloper"})
// })



// app.get('/',(req,res)=>{
//   res.json({"tstingdata":"sahilinida devlope22r"})
// })


// try {
//   connectDB()
// } catch (error) {
//   console.log('error',error)
// }








//   // Send socket.id to the client




  






// //   const socketUsernameMap = {};

  



// //   io.on('connection', (socket) => {
// //     console.log('A user connected: ' + socket.id);
// //   io.emit('server','serer conner')


  
// //     // Event to set username
// //     socket.on('setUsername', (username) => {
// //       // Save the socket.id and username mapping
// //       // socket.emit('userStatus', { username: 'user1', status: true }); // Change username accordingly
// //       // io.emit('userStatus', { username, status: 'online' });
// //       io.emit('userStatus', { username: username, isOnline: true });
// //       console.log(username)
// //       socketUsernameMap[socket.id] = username;
// //       console.log(`Username set for ${socket.id}: ${username}`);
  
// //       // Send confirmation to the client
// //       socket.emit('usernameSet', `Username ${username} set successfully.`);
// //     });

// //     socket.emit("test",'hellotese')
  
// //     // Event to send private messages
// //     socket.on('sendMessage', (recipientUsername, message) => {
// //       // Find the recipient's socket.id based on their username

// //       console.log('mss',message)
// //       const recipientSocketId = Object.keys(socketUsernameMap).find(
// //         (id) => socketUsernameMap[id] === recipientUsername
// //       );
// //       console.log('mess',recipientSocketId)
// //       if (recipientSocketId) {
    
// //         // Send the private message to the recipient
// //         io.to(recipientSocketId).emit('privateMessage', {
// //           username: socketUsernameMap[socket.id],
// //           message,
       
// //         });
// //         console.log(`Message sent to ${recipientUsername}: ${message}`);
// //       } else {
// //         console.log(`Recipient with username ${recipientUsername} not found`);
// //         socket.emit('error', `Recipient ${recipientUsername} not found.`);
// //       }
// //     });
  
// //     // Handle disconnect
// //     socket.on('disconnect', () => {
// //       const username = socketUsernameMap[socket.id];
// //       delete socketUsernameMap[socket.id]; // Remove the mapping when the user disconnects
// //       console.log(`${username} disconnected.`);

// //       io.emit('userStatus', { username: socket.username, isOnline: false });
// //       console.log('userdiscoont',username)

// //       console.log('User disconnected:', socket.username);
// //       if (socket.username) {
// //         const usernamee = socketUsernameMap[socket.id];
// //         io.emit('userStatus', { username: socket.username, isOnline: false });
// //         console.log('userdiscoont',usernamee)
// //       }
// //     });
// //   });



















// // app.get('/', (req, res) => {
// //   res.send('Hello, welcome to my Express app!');
// // });

// // // Start the server
// // server.listen(4000, () => {
// //   console.log('Server is running on http://localhost:4000');
// // });
// // const socketUsernameMap = {};         // socket.id => username
// // const pendingMessages = {};           // username => [msg, msg...]

// // // Socket.IO events
// // io.on('connection', (socket) => {
// //   console.log('User connected:', socket.id);

// //   // Set username
// //   socket.on('setUsername', (username) => {
// //     socketUsernameMap[socket.id] = username;
// //     socket.username = username;
// //     console.log('usernmae',username)

// //     // io.emit('userStatus', { username, isOnline: true });
// //     // console.log(`User online: ${username}`);
// // socket.username = username;
// //   io.emit('userOnline', { username });
// //     // Send any pending messages
// //     if (pendingMessages[username]) {
// //       pendingMessages[username].forEach((msg) => {
// //         socket.emit('privateMessage', msg);
// //       });
// //       delete pendingMessages[username];
// //     }

// //     socket.emit('usernameSet', `Username ${username} set successfully.`);
// //   });

// //   // Send message
// //   socket.on('sendMessage', (to, message) => {
// //     const from = socketUsernameMap[socket.id];
// //     const payload = { username: from, message };

// //     const recipientSocketId = Object.keys(socketUsernameMap).find(
// //       (id) => socketUsernameMap[id] === to
// //     );

// //     if (recipientSocketId) {
// //       io.to(recipientSocketId).emit('privateMessage', payload);
// //       console.log(`Delivered message from ${from} to ${to}: ${message}`);
// //     } else {
// //       console.log(`${to} is offline. Storing message.`);
// //       if (!pendingMessages[to]) pendingMessages[to] = [];
// //       pendingMessages[to].push(payload);
// //     }
// //   });

// //   // On disconnect
// //   socket.on('disconnect', () => {
// //     const username = socketUsernameMap[socket.id];
// //     delete socketUsernameMap[socket.id];

// //     if (username) {
// //       io.emit('userStatus', { username, isOnline: false });
// //       console.log(`User disconnected: ${username}`);
// //     }
// //   });
// // });

// // // Start server
// // const PORT = 4000;
// // server.listen(PORT, () => {
// //   console.log(`Server running at http://localhost:${PORT}`);
// // });









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




















// import express from 'express';  
// import { Server } from 'socket.io'; 
// import cors from 'cors'
// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import derouter from './route/delete.js';
// import routeget from './route/getuser.js';
// import singuproute from './route/singup.js';
// import http from 'http';

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/saveuser', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delate', derouter);
// app.use('/alluserget', routeget);

// // CORS settings for React Native app
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// // Initialize Socket.IO server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   },
// });

// const socketUsernameMap = {};         // socket.id => username
// const pendingMessages = {};           // username => [msg, msg...]

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Set username
//   socket.on('setUsername', (username) => {
//     socketUsernameMap[socket.id] = username; // Save the username
//     socket.username = username; // Attach username to socket
//     console.log('Username set:', username);

//     // Notify others that the user is online
//     io.emit('userOnline', { username });

//     // Send any pending messages if the user had any stored
//     if (pendingMessages[username]) {
//       pendingMessages[username].forEach((msg) => {
//         socket.emit('privateMessage', msg);
//       });
//       delete pendingMessages[username];
//     }

//     socket.emit('usernameSet', `Username ${username} set successfully.`);
//   });

//   // Send message
//   socket.on('sendMessage', (to, message) => {
//     const from = socketUsernameMap[socket.id];
//     const payload = { username: from, message };

//     const recipientSocketId = Object.keys(socketUsernameMap).find(
//       (id) => socketUsernameMap[id] === to
//     );

//     if (recipientSocketId) {
//       io.to(recipientSocketId).emit('privateMessage', payload);
//       console.log(`Delivered message from ${from} to ${to}: ${message}`);
//     } else {
//       console.log(`${to} is offline. Storing message.`);
//       if (!pendingMessages[to]) pendingMessages[to] = [];
//       pendingMessages[to].push(payload);
//     }
//   });

//   // Handle user disconnect
//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     delete socketUsernameMap[socket.id];

//     if (username) {
//       // Notify all users that the user has gone offline
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











// import express from 'express';  
// import http from 'http';
// import { Server } from 'socket.io'; 
// import cors from 'cors';

// import router from './route/userroute.js';
// import { connectDB } from './db.js';
// import routert from './route/test.js';
// import { serchroute } from './route/search.js';
// import derouter from './route/delete.js';
// import routeget from './route/getuser.js';
// import singuproute from './route/singup.js';

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/saveuser', router);
// app.use('/test', routert);
// app.use('/singup', singuproute);
// app.use('/search', serchroute);
// app.use('/delate', derouter);
// app.use('/alluserget', routeget);

// // Simple test route
// app.get('/apitest', (req, res) => {
//   res.json({ testingdata: 'sahilinida developer' });
// });

// // MongoDB connect
// try {
//   connectDB();
// } catch (error) {
//   console.log('DB Connection Error:', error);
// }

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Or use your frontend domain
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   },
// });

// // Socket state
// const socketUsernameMap = {};   // socket.id => username
// const pendingMessages = {};     // username => [messages...]

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Set username
//   socket.on('setUsername', (username) => {
//     socketUsernameMap[socket.id] = username;
//     socket.username = username;
//     console.log(`Username set: ${username}`);

//     // Notify others
//     io.emit('userOnline', { username });

//     // Send any stored messages
//     if (pendingMessages[username]) {
//       pendingMessages[username].forEach((msg) => {
//         socket.emit('privateMessage', msg);
//       });
//       delete pendingMessages[username];
//     }

//     // Confirmation
//     socket.emit('usernameSet', `Username ${username} set successfully.`);
//   });

//   // Send private message
//   socket.on('sendMessage', (to, message) => {
//     const from = socketUsernameMap[socket.id];
//     const payload = { username: from, message };

//     const recipientSocketId = Object.keys(socketUsernameMap).find(
//       (id) => socketUsernameMap[id] === to
//     );

//     if (recipientSocketId) {
//       io.to(recipientSocketId).emit('privateMessage', payload);
//       console.log(`Delivered message from ${from} to ${to}: ${message}`);
//     } else {
//       console.log(`${to} is offline. Storing message.`);
//       if (!pendingMessages[to]) pendingMessages[to] = [];
//       pendingMessages[to].push(payload);
//     }
//   });

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     const username = socketUsernameMap[socket.id];
//     delete socketUsernameMap[socket.id];

//     if (username) {
//       io.emit('userStatus', { username, isOnline: false });
//       console.log(`User disconnected: ${username}`);
//     }
//   });
// });

// // Start server
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


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/', router);
app.use('/test', routert);
app.use('/singup', singuproute);
app.use('/search', serchroute);
app.use('/delete', routedlt);
app.use('/chatlist', chatlapi);

app.get('/apitest', (req, res) => {
  res.json({ testingdata: 'sahilinida developer' });
});

try {
  connectDB();
} catch (error) {
  console.log('DB Connection Error:', error);
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const socketUsernameMap = {}; // socket.id -> username
const pendingMessages = {};   // username -> [messages]

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('setUsername', (username) => {
    socketUsernameMap[socket.id] = username;
    socket.username = username;

    console.log(`🔐 Username set: ${username}`);
    console.log('hii',socketUsernameMap)
    
    // Notify others user is online
    io.emit('userOnline', username);

    // Send pending messages if any
    if (pendingMessages[username]) {
      pendingMessages[username].forEach((msg) => {
        socket.emit('privateMessage', msg);
      });
      delete pendingMessages[username];
    }
  });

  // socket.on('sendMessage', (to, message) => {

  //   console.log(to,message)
  //   const from = socket.username;
  //   const payload = { username: from, message };

  //   const recipientSocketId = Object.keys(socketUsernameMap).find(
  //     (id) => socketUsernameMap[id] === to
  //   );

  //   if (recipientSocketId) {
  //     io.to(recipientSocketId).emit('privateMessage', payload);
  //   } else {
  //     if (!pendingMessages[to]) {
  //       pendingMessages[to] = [];
  //     }
  //     pendingMessages[to].push(payload);
  //   }
  // });



// socket.on('sendMessage', ({ from, to, message, timestamp }) => {
//   console.log('sendMessage from:', from, 'to:', to, 'msg:', message);

//   const payload = { from, message, timestamp };

//   const recipientSocketId = Object.keys(socketUsernameMap).find(
//     (id) => socketUsernameMap[id] === to
//   );

//   if (recipientSocketId) {
//     io.to(recipientSocketId).emit('privateMessage', payload);
//   } else {
//     // store offline message
//     if (!pendingMessages[to]) {
//       pendingMessages[to] = [];
//     }
//     pendingMessages[to].push(payload);
//   }
// });


socket.on('sendMessage', ({ from, to, message, timestamp }) => {
  console.log('sendMessage from:', from, 'to:', to, 'msg:', message);

  const payload = { from, to, message, timestamp };

  const recipientSocketId = Object.keys(socketUsernameMap).find(
    (id) => socketUsernameMap[id] === to
  );

  // Send to recipient if online
  if (recipientSocketId) {
    io.to(recipientSocketId).emit('privateMessage', payload);
  } else {
    // Store if offline
    if (!pendingMessages[to]) {
      pendingMessages[to] = [];
    }
    pendingMessages[to].push(payload);
  }

  // ✅ Also send back to the sender
  socket.emit('privateMessage', payload);
});


  socket.on('disconnect', () => {
    const username = socket.username;
    if (username) {
      io.emit('userOffline', username);
    }
    delete socketUsernameMap[socket.id];
    console.log('🔴 User disconnected:', username || socket.id);
  });
});




const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
