const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const { server } = require("socket.io");
const db = require("./db/config");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let token;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: token,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
