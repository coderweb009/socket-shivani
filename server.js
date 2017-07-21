var express = require('express');
var app = express();
var http = require('http').createServer(app);

// include socket
var io = require('socket.io').listen(http);


http.listen(process.env.PORT || 3000);
var connection = [];

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static('../chat-shivani'))



// on connection establist
io.on('connection', function(socket) {
   
   // For chat part 
   socket.on('chat', function(msg, name) {
        io.sockets.emit('newmsg', { msg: msg, name: name });
        // socket.broadcast.emit('newmsg', {msg:msg,name:name});
    });


    socket.on('typing', function(name) {
        socket.broadcast.emit('typing', name);
    });

    socket.on('typeout', function(msg, name) {
        socket.broadcast.emit('typeout', true);
    });

});