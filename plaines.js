class plaines extends Phaser.Scene {

    constructor() {
        super("plaines");
    }


    preload() {

        this.load.spritesheet('perso', 'assets/sprites/Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 62 });

        this.load.image("tilePlaine", "assets/tileset.png");
        this.load.tilemapTiledJSON("cartePlaines", "assets/maps/map_plaines.json");

    }


    create() {

        const carteDuNiveauPlaines = this.add.tilemap("cartePlaines");

        const tilesetPlaine = carteDuNiveauPlaines.addTilesetImage(
            "tilesetPlaceholder",
            "tilePlaine"
        );



        //il s'appelle calque pic mais c'est surtout celui avec la lave
        const calque_sol_plaines = carteDuNiveauPlaines.createLayer(
            "sol",
            tilesetPlaine
        );

        const calque__sous_murs_plaines = carteDuNiveauPlaines.createLayer(
            "sous_mur",
            tilesetPlaine
        );

        const calque_murs_plaines = carteDuNiveauPlaines.createLayer(
            "murs",
            tilesetPlaine
        );

        const calque_cailloux_plaines = carteDuNiveauPlaines.createLayer(
            "cailloux",
            tilesetPlaine
        );




        calque_murs_plaines.setCollisionByProperty({ EstSolide: true });

        this.player = this.physics.add.sprite(1200, 1500, 'perso');
        this.player.setSize(64, 32, true);
        this.player.setOffset(2, 17);


        this.physics.add.collider(this.player, calque_murs_plaines);


        this.physics.world.setBounds(0, 0, 6400, 6400);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 6400, 6400);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);



        this.cursors = this.input.keyboard.createCursorKeys();




        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);








    }


    update() {


        if (this.cursors.left.isDown) { //si la touche gauche est appuyée
            this.player.setVelocityX(-160); //alors vitesse négative en X
            // this.player.anims.play('left', true); //et animation => gauche
            this.lastFacingDirection = "left"
        }
        else if (this.cursors.right.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityX(160); //alors vitesse positive en X
            // this.player.anims.play('right', true); //et animation => droite
            this.lastFacingDirection = "right"
        }
        else { // sinon
            this.player.setVelocityX(0); //vitesse nulle
            //  this.player.anims.play('turn'); //animation fait face caméra
        }


        if (this.cursors.up.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(-160); //alors vitesse positive en X
            //   this.player.anims.play('right', true); //et animation => droite
            this.lastFacingDirection = "up";

        }
        else if (this.cursors.down.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(160); //alors vitesse positive en X
            //  this.player.anims.play('right', true); //et animation => droite
            this.lastFacingDirection = "down";

        }
        else { // sinon
            this.player.setVelocityY(0); //vitesse nulle
            //  this.player.anims.play('turn'); //animation fait face caméra
        }

    }



}