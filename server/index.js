const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 4000;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // Listens and logs the message to the console
    socket.on("message", (data) => {
        console.log(data);
        // Send the received message back to all clients
        io.emit("messageResponse", data);
    });

    socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
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
