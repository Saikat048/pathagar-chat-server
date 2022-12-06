const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
  
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://pathagar-7e2af.web.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.broadcast.emit('message', 'A user has joined the chat')

  socket.emit("message", 'Welcome to ChatCord')
  socket.on("joinRoom", room => {
		socket.join(room)
  })

  socket.on("newMessage", ({newMessage, room}) => {
    io.in(room).emit("getLatestMessage", newMessage)
  })
 
 
});



server.listen(5000, () => {
  console.log("SERVER IS CONNECTED");
}); 
 
  
 