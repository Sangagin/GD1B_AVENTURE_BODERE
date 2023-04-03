class village extends Phaser.Scene {


    constructor() {

        super("village")
    }




    preload() {
        this.load.spritesheet('perso', 'assets/sprites/Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 62 });

        this.load.image("place", "assets/tilesetPlaceholder.png");



        this.load.tilemapTiledJSON("carteVillage", "assets/maps/map_village.json");

    }


    create() {

        const carteDuNiveauVillage = this.add.tilemap("carteVillage");



        const tileset = carteDuNiveauVillage.addTilesetImage(
            "tilesetPlaceholder",
            "place"
        );


        const calque_sol_village = carteDuNiveauVillage.createLayer(
            "sol",
            tileset
        );

        //il s'appelle calque pic mais c'est surtout celui avec la lave
        const calque_murs_village = carteDuNiveauVillage.createLayer(
            "murs",
            tileset
        );

        const calque_maisons_village = carteDuNiveauVillage.createLayer(
            "maisons",
            tileset
        );



        calque_murs_village.setCollisionByProperty({ EstSolide: true });

        this.player = this.physics.add.sprite(1200, 1500, 'perso');
        this.player.setSize(64, 32, true);
        this.player.setOffset(2, 17);


        this.physics.add.collider(this.player, calque_murs_village);


        this.physics.world.setBounds(0, 0, 6400, 6400);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 6400, 6400);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);



        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastFacingDirection = "right"



        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);




        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'tourni',
            frames: this.anims.generateFrameNumbers('perso', { start: 1, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', { start: -1, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', { start: 10, end: 11 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', { start: 8, end: 9 }),
            frameRate: 5,
            repeat: -1
        });







    }

    update() {



        if (this.player.y > 1500) {
            this.scene.start("plaines");
        }

        //touches de controlex

        if (this.cursors.left.isDown) { //si la touche gauche est appuyée
            this.player.setVelocityX(-160); //alors vitesse négative en X
            this.player.anims.play('left', true); //et animation => gauche
            this.lastFacingDirection = "left"
        }
        else if (this.cursors.right.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityX(160); //alors vitesse positive en X
            this.player.anims.play('right', true); //et animation => droite
            this.lastFacingDirection = "right"
        }
        else { // sinon
            this.player.setVelocityX(0); //vitesse nulle
        }


        if (this.cursors.up.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(-160); //alors vitesse positive en X
            this.player.anims.play('up', true); //et animation => droite
            this.lastFacingDirection = "up";

        }
        else if (this.cursors.down.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(160); //alors vitesse positive en X
            this.player.anims.play('down', true); //et animation => droite
            this.lastFacingDirection = "down";

        }
        else { // sinon
            this.player.setVelocityY(0); //vitesse nulle
        }






    }








}