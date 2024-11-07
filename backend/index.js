require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const middleware = require("./middleware");
const db = require("./db");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    socket.join(`user_${userId}`);
  }

  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnect`);
  });
});

middleware.middlewareConf(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
