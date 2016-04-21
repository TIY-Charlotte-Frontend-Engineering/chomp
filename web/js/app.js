var Folks = require('./folks');
var colors = require('./color');

window.addEventListener('load', function () {
    function render({x, y}) {
        if (x === undefined || y === undefined) return;
        
        document.getElementById(`pos-${x}-${y}`).setAttribute('class', 'game-space');

        squad.arr.forEach(function (player) {
            document.getElementById(`pos-${player.x}-${player.y}`).classList.add(player.label);
        });
    }

    var startGameBtn = document.getElementById('start-new-game');
    var newGameWindow = document.getElementById('newgame');
    var gameWindow = document.getElementById('gamewindow');
    var colorOptions = document.getElementsByClassName('color-picker');
    var gameBoard = document.getElementById('game-board');

    var socket = io('http://localhost');

    var player = null;
    var playerLabel = colors.red;
    var squad = new Folks(socket);
    // When someone clicks start game, hide the 'start game' window and create
    // a new player object.
    startGameBtn.addEventListener('click', function () {
        // Hide the new game window, show the game window.
        newGameWindow.classList.add('hidden');
        gameWindow.classList.remove('hidden');

        player = squad.add({
            name: document.getElementById('codename').value,
            label: playerLabel,
        });

        player.render = render;
        render({ x: undefined, y: undefined});
    });

    window.addEventListener('keyup', function (event) {
        var key = String.fromCharCode(event.keyCode);
        key = key.toLowerCase();

        if (player !== null) {
            if (key === 'd') player.right();
            else if (key === 'w') player.up();
            else if (key === 'a') player.left();
            else if (key === 's') player.down();
        }
    });

    for (let i = 0; i < colorOptions.length; i++) {
        colorOptions[i].classList.add(colors[colorOptions[i].id]);

        colorOptions[i].addEventListener('click', function () {
            playerLabel = colors[colorOptions[i].id];
        });
    }

    for (let y = 19; y >= 0; y--) {
        for (let x = 0; x < 20; x++) {
            var el = document.createElement('div');
            el.classList.add('game-space');
            el.setAttribute('id', `pos-${x}-${y}`);

            gameBoard.appendChild(el);
        }
    }
});