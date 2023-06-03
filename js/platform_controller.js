"use strict";

var config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 900,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
    scene: [ PlatformScene, PauseScene ]
};
var moveCam = false;
var game = new Phaser.Game(config);