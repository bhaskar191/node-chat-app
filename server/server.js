const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket) =>{
console.log('new user is connected');

socket.emit('newMessage',generateMessage('Admin','welcome to the chat app'));
socket.broadcast.emit('newMessage',generateMessage('Admin', 'new user joined'));


socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from,message.text));
   
    callback('This is from server');
});

socket.on('disconnect', () =>{
    console.log('user disconnected');
})
});

server.listen(port,() =>{
    console.log('Server Started at port',+port);
});