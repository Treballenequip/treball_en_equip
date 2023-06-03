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
        this.moveCam = false;
    }
    preload (){	
		this.load.image('sky', '../assets/sky.jpg');
		this.load.spritesheet('dude',
			'../assets/dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		);
	}
    create (){	
		this.cameras.main.setBounds(400, 0, 1920 * 2, 0);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

        
        //  Mash 4 images together to create our background
        for (let x = 0; x < 10; x++)
        {
            this.add.image(700 * x, 0, 'sky').setOrigin(0);
            this.add.image(700 * x, 400, 'sky').setOrigin(0).setFlipY(true);
        }

        this.cursors = this.input.keyboard.createCursorKeys();


		{	// Creem player i definim animacions
			this.player = this.physics.add.sprite(400, 350, 'dude');
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
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(2);
	}
	update (){	
		const cam = this.cameras.main;


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
            this.player.anims.play('right', true);
            this.player.setVelocityX(300);
            console.log(this.player.body.position.y)
            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-400);
				this.player.anims.play('left', true);
            }
            if (this.cursors.up.isDown && this.player.body.position.y == 326)
            {
                this.player.setPosition(this.player.body.position.x,330);
                setTimeout(() => {
                    console.log("1 Segundo esperado")
                  }, 6000);
            }
            else if(this.cursors.up.isDown && this.player.body.position.y == 306)
            {
                this.player.setPosition(this.player.body.position.x,350);
                setTimeout(() => {
                    console.log("1 Segundo esperado")
                  }, 6000);
            }
            else if (this.cursors.down.isDown)
            {
                this.player.setPosition(this.player.body.position.x,320);
                setTimeout(() => {
                    console.log("1 Segundo esperado")
                  }, 1000);
            }
        }
	}
}

