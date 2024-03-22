const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const cors = require("cors");
const server = http.createServer(app);
const PORT = 4000;

app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});


let users = [];

io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data) => {
        io.emit("messageResponse", data);
    });

    //Listens when a new user joins the server
    socket.on("newUser", (data) => {
        //Adds the new user to the list of users
        users.push(data);
        // console.log(users);
        //Sends the list of users to the client
        io.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        io.emit("newUserResponse", users);
        socket.disconnect();
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
