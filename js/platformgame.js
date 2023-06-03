"use strict";

class PlatformScene extends Phaser.Scene {
    constructor (){
        super('PlatformScene');
		this.platforms = null;
		this.player = null;
        this.enemy = null;
		this.cursors = null;
		this.stars = null;
		this.score = 0;
		this.scoreText;
		this.bombs = null;
		this.gameOver = false;
        this.moveCam = false;
        this.distanciaEnemy = 600;
    }
    preload (){	
		this.load.image('sky', '../assets/sky.jpg');
        this.load.image('cameraman', '../assets/camera_man.png');
		this.load.spritesheet('dude',
			'../assets/dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		);
	}
    create (){	
		this.cameras.main.setBounds(0, 0, 3840 * 2, 0);
        this.physics.world.setBounds(0, 0, 3840 * 2, 1080 * 2);

        //Pause execution
        this.input.keyboard.on('keydown-ESC', () => {
            // Pausa el juego principal y lanza la escena del menú de pausa
            this.scene.pause();
            this.scene.launch('PauseGame');
        });

        //  Mash 4 images together to create our background
        for (let x = 0; x < 30; x++)
        {
            this.add.image(700 * x, 0, 'sky').setOrigin(0);
            this.add.image(700 * x, 400, 'sky').setOrigin(0).setFlipY(true);
        }
        this.cursors = this.input.keyboard.createCursorKeys();


		{	// Creem player i definim animacions
            
			this.player = this.physics.add.sprite(200, 340, 'dude');
            //415.6, 375.6, 326
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
        
        this.reporters = this.physics.add.group();
        this.createEnemy();
        this.player.setScale(0.6);
        
        this.physics.add.collider(this.player, this.reporters, 
            (body1, body2)=>this.hitBomb(body1, body2));
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(2.01);
	}
	update (){	
        if (this.gameOver) return;
		const cam = this.cameras.main;

        if (this.player.body.position.x >= this.distanciaEnemy) {
            this.distanciaEnemy += 500;
            console.log(this.distanciaEnemy)
            this.createEnemy();
            this.createEnemy();
        }
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
            if (this.player.body.position.x >= 1000 && this.player.body.position.x < 1500) {
                this.player.setVelocityX(200);
            }
            else if (this.player.body.position.x >= 1500) {
                this.player.setVelocityX(300);
            } 
            else {
                this.player.setVelocityX(100);
            }
            console.log(this.player.body.velocity.x)
            if (this.cursors.left.isDown && this.player.body.position.y != 325.6)
            {
                this.player.setPosition(this.player.body.position.x+5,340);
            }
            else if (this.cursors.down.isDown && this.player.body.position.y != 375.6)
            {
                this.player.setPosition(this.player.body.position.x+5,390   );
            }
            else if (this.cursors.right.isDown && this.player.body.position.y != 415.6)
            {
                this.player.setPosition(this.player.body.position.x+5,430);
            }
        }
        console.log(this.player.body.position.y);
	}
    createEnemy(){
        var rng = Phaser.Math.Between(1, 3);
        var y = 0;
        if (rng == 1) {
            y = 340;
        }
        else if (rng == 2){
            y = 390;
        }
        else if (rng == 3){
            y = 430;
        }
        var enemy = this.reporters.create(this.distanciaEnemy, y, 'cameraman');
        enemy.setCollideWorldBounds(true);
        enemy.setScale(.04);
    }
    hitBomb(player, bomb){
		if (this.gameOver) 
			return;
		this.physics.pause();
		this.player.setTint(0xff0000);
		this.player.anims.play('turn');
		this.gameOver = true;
		setTimeout(()=>loadpage("../"), 3000);
	}
}

// Pause
class PauseScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'PauseGame' });
    }

    preload ()
    {
        this.load.image('title_pause', '../assets/pause.png');
        this.load.image('restart', '../assets/restart.png');
        this.load.image('resume', '../assets/resume.png');
    }

    create ()
    {
        var title_menu = this.add.image(950, 350, 'title_pause');
        var restart_menu = this.add.image(950, 410, 'restart');
        var resume_menu = this.add.image(950, 465, 'resume');

        restart_menu.setInteractive({ draggable: true });
        resume_menu.setInteractive({ draggable: true });

        restart_menu.on('pointerdown', () => {

            this.scene.stop('PlatformScene');
            this.scene.start('PlatformScene');
            this.scene.stop('PauseScene');

        });

        resume_menu.on('pointerdown', () => {

            this.scene.resume('PlatformScene');
            this.scene.stop('PauseGame')

        });

        this.input.keyboard.on('keydown-ESC', () => {

            this.scene.resume('PlatformScene');
            this.scene.stop('PauseGame')
        });
    }
}