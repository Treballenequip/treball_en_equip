"use strict";

class PlatformScene extends Phaser.Scene {
    constructor (){
        super('PlatformScene');
		this.platforms = null;
		this.player = null;
		this.cursors = null;
		this.stars = null;
		this.score = 0;
		this.scoreText;
		this.bombs = null;
		this.gameOver = false;
    }
    preload (){	
		this.load.image('sky', '../assets/sky.jpg');
		this.load.spritesheet('dude',
			'../assets/dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		);
	}
    create (){	
		{	// Creem player i definim animacions
			this.player = this.physics.add.sprite(100, 450, 'dude');
			this.player.setBounce(0.2);
			this.player.setCollideWorldBounds(true);
			
			this.anims.create({
				key: 'left',
				frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: 'turn',
				frames: [ { key: 'dude', frame: 4 } ],
				frameRate: 20
			});

			this.anims.create({
				key: 'right',
				frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
				frameRate: 10,
				repeat: -1
			});
		}
		this.cameras.main.setBounds(0, 0, 720 * 2, 176);

        for (let x = 0; x < 2; x++)
        {
            this.add.image(720 * x, 0, 'sky').setOrigin(0);
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.image(400, 100, 'dude');

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(2);
	}
	update (){	
		const cam = this.cameras.main;

        this.player.setVelocity(0);

        if (this.moveCam)
        {
            if (this.cursors.left.isDown)
            {
                cam.scrollX -= 4;
            }
            else if (this.cursors.right.isDown)
            {
                cam.scrollX += 4;
            }

            if (this.cursors.up.isDown)
            {
                cam.scrollY -= 4;
            }
            else if (this.cursors.down.isDown)
            {
                cam.scrollY += 4;
            }
        }
        else
        {
            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-400);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(400);
            }

            if (this.cursors.up.isDown)
            {
                this.player.setVelocityY(-400);
            }
            else if (this.cursors.down.isDown)
            {
                this.player.setVelocityY(400);
            }
        }
	}
}

