


















import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import { connectDB } from "./db.js";

// ✅ Routes
import router from "./route/userroute.js";
import routert from "./route/test.js";
import { serchroute } from "./route/search.js";
import singuproute from "./route/singup.js";
import chatlapi from "./route/chatlist.js";
import routedlt from "./route/delete.js";
import infinite from "./route/infinite.js";
import log from "./route/loging.js";
import cookieParser from "cookie-parser";
import pymentroute from "./route/paymnet.js";
import Crateuser from "./modal/saveuser.js";
import dwroute from "./route/dwonlaod.js";
import airoute from "./route/aibot.js";
import errorroute from "./route/error.js";
import errorHandler from "./middleware/errror.js";
import grouproute from "./route/group.js";
import Group from "./modal/groupmodle.js";

// ✅ MongoDB Model
const pendingMessageSchema = new mongoose.Schema({
  id: String,
  from: String,
  to: String,
  message: String,
  type: String,
  timestamp: String,
  seen: Boolean,
});
const PendingMessage = mongoose.model("PendingMessage", pendingMessageSchema);

// ✅ Express + HTTP + IO
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });




app.use(cors());
// cookies ke liye must

app.use(express.json());
app.use(cookieParser());

// ✅ Static files (uploads)
app.use("/uploads", express.static("uploads"));

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ File Upload API
app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ✅ Routes
app.use("/", router);
app.use("/test", routert);
app.use("/singup", singuproute);
app.use("/search", serchroute);
app.use("/delete", routedlt);
app.use("/log", log);
app.use("/chatlist", chatlapi);
app.use("/infinite", infinite);
app.use("/pyment", pymentroute);
app.use("/error", errorroute);
app.use("/download", dwroute);
app.use("/crategroup", grouproute);
app.use("/aibot", airoute);


app.get("/apitest", (req, res) => {
  res.json({ status: "✅ Server Running OK-v-5" });
});

app.get("/getuser", async (req, res) => {
  let { username } = req.body;
  let userdata = await Group.find()
  res.json({ status: "✅ OK", userdasta: userdata });





});

app.post("/set-cookie", (req, res) => {
  const { username } = req.body;

  // JWT generate karo ya koi token
  const token = "some-random-token";

  // Cookie set karo
  res.cookie("token", token, {
    httpOnly: true,                       // client JS cannot access
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    maxAge: 7 * 24 * 60 * 60 * 1000,      // 7 days
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
  });

  res.json({ message: "Cookie set successfully!" });
});


app.post("/getuser", async (req, res) => {
  try {
    // req.body GET me usually nahi hota, query params ya POST body use karo
    // let { username } = req.body; // optional

    // Populate usersgroup (jo Crateuser reference hai)
    const userdata = await Group.find().populate("usersgroup", "name");
    // "username email" optional fields, agar sab chahiye to hata do

    res.json({ status: "✅ OK", userdasta: userdata });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ status: "❌ ERROR", message: "Server error" });
  }
});


// ✅ DB Connect
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(console.error);

app.use(errorHandler);

// ✅ Socket Maps
const socketUsernameMap = {};
const usernameSocketMap = {};

// ✅ Socket.io Logic
io.on("connection", (socket) => {
  console.log(`🔗 New Socket: ${socket.id}`);


  socket.on("joinGroup", ({ groupId }) => {
    socket.join(groupId);
    console.log(`${socket.id} joined ${groupId}`);
  });








  // Send message
  socket.on("groupMessage", ({ groupId, username, text }) => {

    console.log(groupId, username, text)
    io.to(groupId).emit("groupmessage", { username, text, groupId });

  });

  // Leave group
  socket.on("leaveGroup", ({ groupId, username }) => {
    socket.leave(groupId);
    io.to(groupId).emit("message", { system: true, text: `${username} left` });
  });








  // ===== Call setup =====
  socket.on("call-user", ({ from, to }) => {
    console.log(`${from} is calling ${to}`);
    const targetSocketId = usernameSocketMap[to]?.[0];
    if (targetSocketId) {
      io.to(targetSocketId).emit("incoming-call", { from });
    }
  });

  socket.on("accept-call", ({ from, to }) => {
    console.log(`${to} accepted call from ${from}`);
    const targetSocketId = usernameSocketMap[to]?.[0];
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-accepted", { from });
    }
  });

  socket.on("reject-call", ({ from, to }) => {
    console.log(`User ${to} rejected call from ${from}`);
    const targetSocketId = usernameSocketMap[from]?.[0];
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-rejected", { from: to });
    }
  });

  // ===== WebRTC signaling =====
  socket.on("webrtc-offer", ({ room, offer }) => {
    const targetSocketId = usernameSocketMap[room]?.[0];
    if (targetSocketId) io.to(targetSocketId).emit("webrtc-offer", { offer, room: socket.id });
  });

  socket.on("webrtc-answer", ({ room, answer }) => {
    io.to(room).emit("webrtc-answer", { answer });
  });

  socket.on("webrtc-ice-candidate", ({ room, candidate }) => {
    const targetSocketId = usernameSocketMap[room]?.[0];
    if (targetSocketId) io.to(targetSocketId).emit("webrtc-ice-candidate", { candidate });
  });

  // ===== User online/offline + pending messages =====
  socket.on("setUsername", async (username) => {
    console.log('userconnected  id--', username)
    socketUsernameMap[socket.id] = username;
    if (!usernameSocketMap[username]) usernameSocketMap[username] = [];
    usernameSocketMap[username].push(socket.id);

    io.emit("userStatus", { username, online: true });

    const pending = await PendingMessage.find({ to: username });
    if (pending.length) {
      pending.forEach((msg) => socket.emit("privateMessage", msg));
      await PendingMessage.deleteMany({ to: username });
    }
  });

  // ===== Chat messaging =====
  socket.on("sendMessage", async ({ id, from, to, message, type, timestamp }) => {
    console.log(message, from, to)
    const payload = { id, from, to, message, type, timestamp, seen: false };
    const recvs = usernameSocketMap[to];
    if (recvs?.length) recvs.forEach((id) => io.to(id).emit("privateMessage", payload));
    const senders = usernameSocketMap[from];
    if (senders) senders.forEach((id) => io.to(id).emit("privateMessage", payload));
  });

  socket.on("typing", ({ from, to }) => {
    usernameSocketMap[to]?.forEach((id) => io.to(id).emit("typing", { from, typing: true }));
  });

  socket.on("stopTyping", ({ from, to }) => {
    usernameSocketMap[to]?.forEach((id) => io.to(id).emit("typing", { from, typing: false }));
  });

  socket.on("seen", ({ from, to, ids }) => {
    usernameSocketMap[to]?.forEach((id) => io.to(id).emit("messageSeen", { from, to, ids }));
  });

  // ===== Disconnect =====
  socket.on("disconnect", () => {
    const username = socketUsernameMap[socket.id];
    delete socketUsernameMap[socket.id];
    if (username) {
      usernameSocketMap[username] = usernameSocketMap[username].filter((id) => id !== socket.id);
      if (usernameSocketMap[username].length === 0) {
        delete usernameSocketMap[username];
        io.emit("userStatus", { username, online: false });
      }
    }
    console.log(`❌ Socket left: ${socket.id} (${username || "unknown"})`);
  });
});

// ✅ Server Listen
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
