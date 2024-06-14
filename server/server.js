const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT;

app.use("/", require("./routes/subdir.js"));

const server = app.listen(port, () => { console.log("Listening on port : " + port); });

const io = require('socket.io')(server, {
    pingTimeout: 600000,
    cors : {
        origin: "http://localhost:5173",
    }
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("join chat", (data) => {
        socket.join(data._id);
        socket.emit("User joined room : " + data._id);
    });
    socket.on("new message", (newMessageRecieved) => {
        var message = newMessageRecieved;
        socket.in(message.grpId).emit("message received", message);
    })
    
})

