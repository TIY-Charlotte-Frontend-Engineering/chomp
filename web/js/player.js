function randomId() {
    return Math.round(Math.random() * 10000);
}

function randomPos() {
    return Math.floor(Math.random() * 10);
}

function Player({name, label, id = randomId() }, socket) {
    this.id = id;
    this.name = name;
    this.label = label;

    this.x = randomPos();
    this.y = randomPos();

    this.socket = socket;
    return this;
}

Player.prototype.up = function () {
    if (this.y + 1 < 20) {
        this.y++;
        this.change('y', this.y);
    }
};

Player.prototype.down = function () {
    if (this.y - 1 >= 0) {
        this.y--;
        this.change('y', this.y);
    }
};

Player.prototype.right = function () {
    if (this.x + 1 < 20) {
        this.x++;
        this.change('x', this.x);
    }
};

Player.prototype.left = function () {
    if (this.x - 1 >= 0) {
        this.x--;
        this.change('x', this.x);
    }
};

Player.prototype.change = function (property, value) {
    var old = {
        x: this.x,
        y: this.y,
    };
    
    console.log('old:', old);

    this.socket.emit('update', {
        [property]: value
    });

    this.render(old);
}

module.exports = Player;