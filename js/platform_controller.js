"use strict";

var config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 1000,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
    scene: [ PlatformScene ]
};
var moveCam = false;
var game = new Phaser.Game(config);