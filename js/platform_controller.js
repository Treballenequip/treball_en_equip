"use strict";

var config = {
	type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1500,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [ PlatformScene ]
};
var moveCam = false;

var game = new Phaser.Game(config);
