const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.on('connection', socket => {
    console.log('Successful connection!');
    connections.push(socket);

    socket.on('disconnect', data => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnection!')
    });

    socket.on('send_mess', (data) => {
        io.emit('add_mess', {mess: data.mess, name: data.name, className: data.className});
    });
});