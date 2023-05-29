"use strict";

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
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