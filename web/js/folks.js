var Player = require('./player');

function Folks(socket) {
    this.folks = {};
    this.arr = [];
    this.socket = socket;
    
    var self = this;
    
    socket.on('update', function (message) {
        self.update(message.id, message);
    });
    
    return this; 
};

Folks.prototype.add = function(options) {
    var player = new Player(options, this.socket);
    this.folks[player.id] = player;
    this.arr.push(player);
    
    return player;
};

Folks.prototype.update = function (id, diff) {
    console.log('stub: updating player ' + id);
};

module.exports = Folks;