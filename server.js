const express = require("express");
const http= require("http");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const server= http.createServer(app);
const io= require('socket.io')(server);
const { writeMessage, findUser, findRoom, updateSubject } = require('./controllers/chatController');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nerdherd");

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

io.on("connection", socket => {
  console.log(socket.id);

socket.on("userdata", user => {
  console.log("call made");
  findUser(user, data => {
      socket.emit("returnuser", data.threads);
  })
})

socket.on("updateSubject", data => {
  updateSubject(data.subject, data.room);
  // console.log('updating subject!');

  // socket.emit('newSubject', {sub: data.subject, room: data.room});
})

socket.on("info", room => {
  socket.join(room);
  findRoom(room, (data) => {
      socket.emit("response", data);
  })
})

socket.on("event", data => {
  console.log("otherUser: " + data.otherUser);
  if(data.type=== "msg") {
    writeMessage(data.room, data.user, data.newMessage);
    io.to(data.room).emit("message", {text: data.newMessage, sender: data.user});
  }
  socket.broadcast.emit("notification", {sender: data.user, sentTo: data.otherUser, type: data.type});
})
})

const env = require('dotenv');
env.config();
