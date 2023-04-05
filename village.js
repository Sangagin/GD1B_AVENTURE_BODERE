class village extends Phaser.Scene {


    constructor() {

        super("village")
    }




    preload() {
        this.load.spritesheet('perso', 'assets/sprites/Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('courrant', 'assets/sprites/courrant.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('epee', 'assets/anims/Anim_epee.png',
            { frameWidth: 64, frameHeight: 64*2 });
            
        this.load.spritesheet('epee2', 'assets/anims/Anim_epee2.png',
        { frameWidth: 64*2, frameHeight: 64 });

        this.load.spritesheet('pince', 'assets/anims/Sprite_pince.png',
        { frameWidth: 128, frameHeight: 64 });

        this.load.spritesheet('pince2', 'assets/anims/Sprite_pince2.png',
        { frameWidth: 64, frameHeight: 128 });


        this.load.image("tileVillage", "assets/tileset.png");



        this.load.tilemapTiledJSON("carteVillage", "assets/maps/map_village.json");

    }


    create() {

        const carteDuNiveauVillage = this.add.tilemap("carteVillage");



        const tilesetVillage = carteDuNiveauVillage.addTilesetImage(
            "tilesetPlaceholder",
            "tileVillage"
        );


        const calque_sol_village = carteDuNiveauVillage.createLayer(
            "sol",
            tilesetVillage
        );

        //il s'appelle calque pic mais c'est surtout celui avec la lave
        const calque_murs_village = carteDuNiveauVillage.createLayer(
            "murs",
            tilesetVillage
        );

        const calque_maisons_village = carteDuNiveauVillage.createLayer(
            "maisons",
            tilesetVillage
        );



        calque_murs_village.setCollisionByProperty({ EstSolide: true });


        //création courrant
        this.courant = this.physics.add.sprite(1200, 4000, 'courrant');
        this.courant.body.immovable = true;
        this.courant.body.allowGravity = false;

        //création player
        this.player = this.physics.add.sprite(900, 4000, 'perso');
        this.player.setScale(1.6);
        this.player.setSize(64, 32, true);
        this.player.setOffset(2, 17);


        //collider avec les murs
        this.physics.add.collider(this.player, calque_murs_village);


        this.physics.world.setBounds(0, 0, 6400, 6400);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 6400, 6400);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);


        //création armes
        this.epee = this.physics.add.sprite(0, 6400, 'epee');
        this.epee2 = this.physics.add.sprite(0, 6400, 'epee2');
        this.pince = this.physics.add.sprite(0, 6400, 'pince');
        this.pince2 = this.physics.add.sprite(0, 6400, 'pince2');


        this.attk=true;


        //cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastFacingDirection = "right"



        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);




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
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', { start: 12, end: 15 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', { start: 8, end: 11 }),
            frameRate: 5,
            repeat: -1
        });


        //anim courrant
        this.anims.create({
            key: 'coura',
            frames: this.anims.generateFrameNumbers('courrant', { start: 0, end: 8 }),
            frameRate: 5,
            repeat: -1
        });


        //anim epee
        this.anims.create({
            key: 'epee',
            frames: this.anims.generateFrameNumbers('epee', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'epee2',
            frames: this.anims.generateFrameNumbers('epee2', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });



        //anim pince
        this.anims.create({
            key: 'pince',
            frames: this.anims.generateFrameNumbers('pince', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'pince2',
            frames: this.anims.generateFrameNumbers('pince2', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });



        this.physics.add.overlap(this.player, this.courant, this.moveForce, null, this);



    }

    update() {


        //param des téléporteurs de scenes
        if (this.player.x > 3000) {
            this.scene.start("plaines");
        }

        //affichage des attaques



        if (this.keyA.isDown && this.attk) {
            this.attk=false;
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();
            

            if (this.lastFacingDirection == "right") {
                this.epee.anims.play('epee', true); 
                this.epee.x = this.player.x + 70
                this.epee.y = this.player.y
                this.epee.setAngle(0)

            }
            else if (this.lastFacingDirection == "left") {
                this.epee.anims.play('epee', true); 
                this.epee.x = this.player.x - 70
                this.epee.y = this.player.y
                this.epee.setAngle(180)

            }

            else if (this.lastFacingDirection == "up") {
                this.epee2.anims.play('epee2', true); 
                this.epee2.x = this.player.x
                this.epee2.y = this.player.y - 70
                this.epee2.setAngle(180);
                
            }
            else if (this.lastFacingDirection == "down") {
                this.epee2.anims.play('epee2', true); 
                this.epee2.x = this.player.x;
                this.epee2.y = this.player.y + 70;
                this.epee2.setAngle(0);
            }


            setTimeout(() => {
                this.input.keyboard.enabled = true;
                this.epee.x = 0;
                this.epee.y = 6200;
                this.epee2.x = 0;
                this.epee2.y = 6200;
                this.attk=true;
            }, 550);
        }


        if (this.keyZ.isDown && this.attk) {
            this.attk=false;
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();


            if (this.lastFacingDirection == "right") {
                this.pince.anims.play('pince', true); 
                this.pince.x = this.player.x + 110
                this.pince.y = this.player.y
                this.pince.setAngle(0)

            }
            else if (this.lastFacingDirection == "left") {
                this.pince.anims.play('pince', true); 
                this.pince.x = this.player.x - 110
                this.pince.y = this.player.y
                this.pince.setAngle(180)

            }

            else if (this.lastFacingDirection == "up") {
                this.pince2.anims.play('pince2', true); 
                this.pince2.x = this.player.x
                this.pince2.y = this.player.y - 110
                this.pince2.setAngle(180);
                
            }
            else if (this.lastFacingDirection == "down") {
                this.pince2.anims.play('pince2', true); 
                this.pince2.x = this.player.x;
                this.pince2.y = this.player.y + 110;
                this.pince2.setAngle(0);
            }


            setTimeout(() => {
                this.input.keyboard.enabled = true;
                this.pince.x = 0;
                this.pince.y = 6200;
                this.pince2.x = 0;
                this.pince2.y = 6200;
                this.attk=true;
            }, 600);
        }





        //touches de controlex

        if (this.cursors.left.isDown) { //si la touche gauche est appuyée
            this.player.setVelocityX(-200); //alors vitesse négative en X
            this.player.anims.play('left', true); //et animation => gauche
            this.lastFacingDirection = "left"
            this.player.setSize(64, 32, true);
            this.player.setOffset(2, 17);
            this.courant.anims.play('coura', true);
        }
        else if (this.cursors.right.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityX(200); //alors vitesse positive en X
            this.player.anims.play('right', true); //et animation => droite
            this.lastFacingDirection = "right"
            this.player.setSize(64, 32, true);
            this.player.setOffset(2, 17);
        }
        else { // sinon
            this.player.setVelocityX(0); //vitesse nulle
        }


        if (this.cursors.up.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(-200); //alors vitesse positive en X
            this.player.anims.play('up', true); //et animation => droite
            this.lastFacingDirection = "up";
            // this.player.setSize(32, 64, true);
            //this.player.setOffset(2, 17);

        }
        else if (this.cursors.down.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(200); //alors vitesse positive en X
            this.player.anims.play('down', true); //et animation => droite
            this.lastFacingDirection = "down";
            //this.player.setSize(32, 64, true);
            // this.player.setOffset(2, 17);

        }
        else { // sinon
            this.player.setVelocityY(0); //vitesse nulle
        }






    }

    moveForce() {


        setTimeout(() => {
            this.cursors.right.reset();
        }, 300);



    }








}