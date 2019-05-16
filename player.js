// Daniel Holmes
// 16/5/2019
// Player Class

function Player(x, y, w, h, s) {
    /* game class */
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.s = 3;
    this.dirx = 0;
    this.diry = 0;

    this.colour = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;

    this.move_x = function() {
        /* move player on x direction */
        this.x += this.s * this.dirx;
    };

    this.move_y = function() {
        /* move player on y direction */
        this.y += this.s * this.diry;
    };

    this.move = function() {
        /* move player */ 
        this.move_x();
        this.move_y();
    };

    this.update_direction = function(direction) {
        /* received from socket */
        this.dirx = direction.dirx;
        this.diry = direction.diry;
    };
  };

  module.exports = Player