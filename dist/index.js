"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// Create an HTTP server and set CORS headers
const httpServer = (0, http_1.createServer)((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.end();
});
// Create a Socket.IO server and set CORS options
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// Handle incoming socket connections
io.on("connection", (socket) => {
    console.log("A user connected");
    // Handle incoming "user" events and broadcast the data to all connected clients
    socket.on("user", (userData) => {
        console.log(`User ${userData.name} is online!`);
        io.emit("user", userData);
    });
    // Handle incoming "message" events and broadcast the data to all connected clients
    socket.on("message", (messageData) => {
        console.log("Received message:", messageData);
        io.emit("message", messageData);
    });
    // Handle socket disconnections
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
// Start the server and listen on port 8080
httpServer.listen(8080, () => {
    console.log("Socket.IO server running port 8080");
});
