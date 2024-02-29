const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatmsg = require('./utils/messages');
const { userjoin, getcurrentuser, getroomusers ,userleave} = require('./utils/users');
const { format } = require('path');

const app = express();

const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(__dirname));

const botname = 'ChatBot'

io.on('connection', socket => {
    socket.on('joinroom', ({ username, room }) => {
        const user = userjoin(socket.id, username, room);
        socket.join(user.room);
        socket.emit('message', formatmsg(botname, 'Welcome to this app'));

        //when user connects
        socket.broadcast.to(user.room).emit('message', formatmsg(botname, `${user.username} has joined`));

        //listen for chat msg
        socket.on('chatmsg', msg => {
            const user = getcurrentuser(socket.id);
            io.to(user.room).emit('message', formatmsg(user.username, msg));
        })
        //whenuser disconnects
        socket.on('disconnect', () => {
            const user = userleave(socket.id);
            if(user){
            io.to(user.room).emit('message', formatmsg(botname, `${user.username} has left the chat`));
            io.to(user.room).emit('roomusers',{
                room: user.room,
                users: getroomusers(user.room)
            })

    }})
    //send user name and room info
    io.to(user.room).emit('roomusers',{
        room: user.room,
        users: getroomusers(user.room)
    })
    })




})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log("Server running"));