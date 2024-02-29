const express = require('express');
const http = require('http');
const socketio=require('socket.io');

const app=express();

const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(__dirname));

io.on('connection',socket=>{

    socket.emit('message', 'Welcome to this app');

    //when user connects
    socket.broadcast.emit('message', 'A user has joined');

    //whenuser disconnects
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has disconnected');
    })
    //listen for chat msg
    socket.on('chatmsg',msg=>{
        io.emit('message',msg);
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT,()=> console.log("Server running"));