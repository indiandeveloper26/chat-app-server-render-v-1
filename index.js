


import express from 'express';  // Use ES6 import syntax (if "type": "module" is set in package.json)

import { Server } from 'socket.io'; // Importing the Server class from socket.io
import cors from 'cors'
import router from './route/userroute.js';
import { connectDB } from './db.js';
import routert from './route/test.js';
import http from 'http'
import { serchroute } from './route/search.js';
import derouter from './route/delete.js';
import routeget from './route/getuser.js';







const app = express();

app.use(cors())
app.use(express.json());

app.use('/saveuser',router)
app.use('/test',routert)
app.use('/search',serchroute)
app.use('/delate',derouter)
app.use('/alluserget',routeget)
const server = http.createServer(app);

// Set up CORS to allow connections from your React app
app.use(cors({
  origin: 'http://localhost:3000', // React app is running on this port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Initialize Socket.IO


try {
  connectDB()
} catch (error) {
  console.log('error',error)
}

const io = new Server(server,{
  cors: {
    origin: '*', // Allow only the React app on this port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});




app.get('/apitest',(req,res)=>{
  res.json({"tstingdata":"sahilinida devloper"})
})



app.get('/',(req,res)=>{
  res.json({"tstingdata":"sahilinida devlope22r"})
})


  // Send socket.id to the client




  






  const socketUsernameMap = {};

  



  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
  io.emit('server','serer conner')


  
    // Event to set username
    socket.on('setUsername', (username) => {
      // Save the socket.id and username mapping

      console.log(username)
      socketUsernameMap[socket.id] = username;
      console.log(`Username set for ${socket.id}: ${username}`);
  
      // Send confirmation to the client
      socket.emit('usernameSet', `Username ${username} set successfully.`);
    });
  
    // Event to send private messages
    socket.on('sendMessage', (recipientUsername, message) => {
      // Find the recipient's socket.id based on their username
      const recipientSocketId = Object.keys(socketUsernameMap).find(
        (id) => socketUsernameMap[id] === recipientUsername
      );
  
      if (recipientSocketId) {
        // Send the private message to the recipient
        io.to(recipientSocketId).emit('privateMessage', {
          from: socketUsernameMap[socket.id],
          message,
        });
        console.log(`Message sent to ${recipientUsername}: ${message}`);
      } else {
        console.log(`Recipient with username ${recipientUsername} not found`);
        socket.emit('error', `Recipient ${recipientUsername} not found.`);
      }
    });
  
    // Handle disconnect
    socket.on('disconnect', () => {
      const username = socketUsernameMap[socket.id];
      delete socketUsernameMap[socket.id]; // Remove the mapping when the user disconnects
      console.log(`${username} disconnected.`);
    });
  });



















app.get('/', (req, res) => {
  res.send('Hello, welcome to my Express app!');
});

// Start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
