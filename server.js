var path = require('path')

var http = require('http');
var express = require('express');
var socket = require('socket.io');
var bodyParser = require('body-parser');


var app = express();
var server = http.Server(app);
app.use('/assets', express.static(path.join(__dirname, "./views/assets")));

var io = socket(server);

app.use(bodyParser.urlencoded({extended:true}));
require('./routes/chat.routes')(app)



io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('Message: '+msg);
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});


server.listen(3000, function(){
    console.log('Listening on port: 3000');
});