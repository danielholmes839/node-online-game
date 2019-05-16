// Daniel Holmes
// 16/5/2019
// Game Class

const Player = require('./player.js');

function Game() {
    /* game class */
    this.players = {};

    this.disconnect = function(socket) {
        /* remove player from the game */
        delete this.players[socket.id];
    };

    this.connect = function(socket) {
        /* add player to the game */
        this.players[socket.id] = new Player(50, 50, 50, 50, 2);
    };

    this.move_players = function() {
        /* move all players in the game */
        for (let player_key in this.players) {
            let player = this.players[player_key];
            player.move();
        }
    };

    this.run = function() {
        /* game loop */ 
        this.move_players();
    };
};

module.exports = Game;