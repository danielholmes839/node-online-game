// Daniel Holmes
// 16/5/2019
// Server

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function() {
    console.log('Listening on port', app.get('port'));
});

const Game = require('./game.js');  // Game class
var game_state = new Game();        // Create an instance of the game
var room = 'demo';               

setInterval(function() {
    game_state.run();
}, 15);

var game = io.of('/game').on('connection', function(socket){
    /* socket for running the game */ 
    console.log('socket connected', socket.id);
    socket.join(room);
    game_state.connect(socket);
    
    socket.on('disconnect', function() {
        /* disconnect sockets */
        console.log('disconnecting socket', socket.id);
        socket.leave(room);
        game_state.disconnect(socket);
    });

    socket.on('update player direction', function(direction){
        /* receive player control inputs */
        game_state.players[socket.id].update_direction(direction);
    });

    setInterval(function() {
        /* send updated game state*/
        socket.to(room).emit('send game state', game_state);
    }, 15);
     
});

app.get('/', function(req, res){
    /* send html */
    res.sendFile(`client/index.html`, {'root': __dirname});
});
