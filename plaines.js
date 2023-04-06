class plaines extends Phaser.Scene {

    constructor() {
        super("plaines");
    }

    init(data) {
        console.log('init', data);
        this.origine=data.origin
        this.powerup2 = data.powerup2;
        this.powerup3 = data.powerup3;
        this.vieActuelle = data.vieA;
        this.vieMax = data.vieM;
        this.counterPerle=data.counterPerle

    }

    preload() {

        this.load.spritesheet('perso', 'assets/sprites/Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 62 });

        this.load.image("tilePlaine", "assets/tileset.png");
        this.load.tilemapTiledJSON("cartePlaines", "assets/maps/map_plaines.json");

        if (this.powerup3) {
            this.load.spritesheet('UI1', 'assets/UI/UI_3.png',
                { frameWidth: 576, frameHeight: 320 });
        }
        else if (this.powerup2) {
            this.load.spritesheet('UI1', 'assets/UI/UI_2.png',
                { frameWidth: 576, frameHeight: 320 });
        }
        else {
            this.load.spritesheet('UI1', 'assets/UI/UI_1.png',
                { frameWidth: 576, frameHeight: 320 });
        }



        this.load.image("gun", "assets/anims/pistolet_crevette.png");
        this.load.image("bulles", "assets/anims/bulles.png");
        this.load.image("requin", "assets/sprites/Sprite_enemmi_01.png");
        this.load.image("soin", "assets/sprites/Sprite_coeur_soin.png");
        this.load.image("perle", "assets/sprites/Sprite_perle.png");


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



        if (this.origine == "village") {


            this.player = this.physics.add.sprite(360, 2900, 'perso');
        }

        else {
            this.player = this.physics.add.sprite(6050, 4960, 'perso');

        }

        this.origine="plaines"


        this.physics.add.collider(this.player, calque_murs_plaines);


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


        //affichage UI
        this.ui = this.physics.add.sprite(235, 130, 'UI1');
        this.ui.setScale(0.8)
        this.ui.depth = 2;
        this.ui.setScrollFactor(0)


        //compteur de monnaie
        this.comptPerle = this.add.text(135, 195, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 });
        this.comptPerle.depth = 4
        this.comptPerle.setScrollFactor(0);
        this.comptPerle.setScale(0.8)


        //armes

        this.epee = this.physics.add.sprite(0, 6400, 'epee');
        this.epee2 = this.physics.add.sprite(0, 6400, 'epee2');
        this.pince = this.physics.add.sprite(0, 6400, 'pince');
        this.pince2 = this.physics.add.sprite(0, 6400, 'pince2');
        this.gun = this.physics.add.sprite(0, 6400, 'gun');
        this.bulles1 = this.physics.add.sprite(0, 6400, 'bulles');
        this.bulles2 = this.physics.add.sprite(0, 6400, 'bulles');
        this.bulles3 = this.physics.add.sprite(0, 6400, 'bulles');
        this.bulles4 = this.physics.add.sprite(0, 6400, 'bulles');

        this.bulleUtil = 0;
        this.attk = true;
        this.degatsPris = false;
        this.courantActif = false


        //anims
        {
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

            {

                this.anims.create({
                    key: ' UI1max2actuel1',
                    frames: [{ key: 'UI1', frame: 2 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max2actuel2',
                    frames: [{ key: 'UI1', frame: 3 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel1',
                    frames: [{ key: 'UI1', frame: 4 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel2',
                    frames: [{ key: 'UI1', frame: 5 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel3',
                    frames: [{ key: 'UI1', frame: 6 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel4',
                    frames: [{ key: 'UI1', frame: 7 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel1',
                    frames: [{ key: 'UI1', frame: 8 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel2',
                    frames: [{ key: 'UI1', frame: 9 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel3',
                    frames: [{ key: 'UI1', frame: 10 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel4',
                    frames: [{ key: 'UI1', frame: 11 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel5',
                    frames: [{ key: 'UI1', frame: 12 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel6',
                    frames: [{ key: 'UI1', frame: 13 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel1',
                    frames: [{ key: 'UI1', frame: 14 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel2',
                    frames: [{ key: 'UI1', frame: 15 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel3',
                    frames: [{ key: 'UI1', frame: 16 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel4',
                    frames: [{ key: 'UI1', frame: 17 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel5',
                    frames: [{ key: 'UI1', frame: 18 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel6',
                    frames: [{ key: 'UI1', frame: 19 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel7',
                    frames: [{ key: 'UI1', frame: 20 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel8',
                    frames: [{ key: 'UI1', frame: 21 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel1',
                    frames: [{ key: 'UI1', frame: 22 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel2',
                    frames: [{ key: 'UI1', frame: 23 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel3',
                    frames: [{ key: 'UI1', frame: 24 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel4',
                    frames: [{ key: 'UI1', frame: 25 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel5',
                    frames: [{ key: 'UI1', frame: 26 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel6',
                    frames: [{ key: 'UI1', frame: 27 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel7',
                    frames: [{ key: 'UI1', frame: 28 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel8',
                    frames: [{ key: 'UI1', frame: 29 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel9',
                    frames: [{ key: 'UI1', frame: 30 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel10',
                    frames: [{ key: 'UI1', frame: 31 }],
                    frameRate: 20
                });


            }

        }




    }


    update() {

        this.comptPerle.setText(this.counterPerle)

        //game over
        if (this.vieActuelle <= 0) {
            console.log("change")
            this.scene.start("menu", { etat: true });
        }


        //affichage des attaques



        if (this.keyA.isDown && this.attk) {
            this.attk = false;
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
                this.attk = true;
            }, 550);
        }


        if (this.keyZ.isDown && this.attk && this.powerup2) {
            this.attk = false;
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
                this.attk = true;
            }, 600);
        }

        if (this.keyE.isDown && this.attk && this.powerup3) {
            this.attk = false;
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();



            if (this.lastFacingDirection == "right") {
                this.gun.x = this.player.x + 70
                this.gun.y = this.player.y
                this.gun.setAngle(0)
                this.gun.flipX = false;
                this.gun.flipY = false;
                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x + 70 + 64
                    this.bulles1.y = this.player.y
                    this.bulles1.setAngle(0)
                    this.bulles1.setVelocityX(350);
                    this.bulles1.setVelocityY(0);
                    this.bulleUtil = this.bulleUtil + 1
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x + 70 + 64
                    this.bulles2.y = this.player.y
                    this.bulles2.setAngle(0)
                    this.bulles2.setVelocityX(350);
                    this.bulles2.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x + 70 + 64
                    this.bulles3.y = this.player.y
                    this.bulles3.setAngle(0)
                    this.bulles3.setVelocityX(350);
                    this.bulles3.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x + 70 + 64
                    this.bulles4.y = this.player.y
                    this.bulles4.setAngle(0)
                    this.bulles4.setVelocityX(350);
                    this.bulles4.setVelocityY(0);
                    this.bulleUtil = 0;
                }


            }
            else if (this.lastFacingDirection == "left") {
                this.gun.x = this.player.x - 70
                this.gun.y = this.player.y
                this.gun.flipY = true;
                this.gun.setAngle(180)


                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x - 70 - 64
                    this.bulles1.y = this.player.y
                    this.bulles1.setAngle(180)
                    this.bulles1.setVelocityX(-350);
                    this.bulles1.setVelocityY(0);
                    this.bulleUtil = this.bulleUtil + 1
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x - 70 - 64
                    this.bulles2.y = this.player.y
                    this.bulles2.setAngle(180)
                    this.bulles2.setVelocityX(-350);
                    this.bulles2.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x - 70 - 64
                    this.bulles3.y = this.player.y
                    this.bulles3.setAngle(180)
                    this.bulles3.setVelocityX(-350);
                    this.bulles3.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x - 70 - 64
                    this.bulles4.y = this.player.y
                    this.bulles4.setAngle(180)
                    this.bulles4.setVelocityX(-350);
                    this.bulles4.setVelocityY(0);
                    this.bulleUtil = 0;
                }


            }

            else if (this.lastFacingDirection == "up") {
                this.gun.x = this.player.x
                this.gun.y = this.player.y - 70
                this.gun.setAngle(280);
                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x
                    this.bulles1.y = this.player.y - 70 - 64
                    this.bulles1.setAngle(280)
                    this.bulles1.setVelocityX(0);
                    this.bulles1.setVelocityY(-350);
                    this.bulleUtil = this.bulleUtil + 1
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x
                    this.bulles2.y = this.player.y - 70 - 64
                    this.bulles2.setAngle(280)
                    this.bulles2.setVelocityX(0);
                    this.bulles2.setVelocityY(-350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x
                    this.bulles3.y = this.player.y - 70 - 64
                    this.bulles3.setAngle(280)
                    this.bulles3.setVelocityX(0);
                    this.bulles3.setVelocityY(-350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x
                    this.bulles4.y = this.player.y - 70 - 64
                    this.bulles4.setAngle(280)
                    this.bulles4.setVelocityX(0);
                    this.bulles4.setVelocityY(-350);
                    this.bulleUtil = 0;
                }






            }
            else if (this.lastFacingDirection == "down") {
                this.gun.x = this.player.x;
                this.gun.y = this.player.y + 70;
                this.gun.setAngle(90);



                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x
                    this.bulles1.y = this.player.y + 70 + 64
                    this.bulles1.setAngle(90)
                    this.bulles1.setVelocityX(0);
                    this.bulles1.setVelocityY(350);
                    this.bulleUtil = this.bulleUtil + 1
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x
                    this.bulles2.y = this.player.y + 70 + 64
                    this.bulles2.setAngle(90)
                    this.bulles2.setVelocityX(0);
                    this.bulles2.setVelocityY(350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x
                    this.bulles3.y = this.player.y + 70 + 64
                    this.bulles3.setAngle(90)
                    this.bulles3.setVelocityX(0);
                    this.bulles3.setVelocityY(350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x
                    this.bulles4.y = this.player.y + 70 + 64
                    this.bulles4.setAngle(90)
                    this.bulles4.setVelocityX(0);
                    this.bulles4.setVelocityY(350);
                    this.bulleUtil = 0;
                }



            }


            setTimeout(() => {
                this.input.keyboard.enabled = true;
                this.gun.x = 0;
                this.gun.y = 6200;
                this.gun.x = 0;
                this.gun.y = 6200;
                this.attk = true;
            }, 300);
        }





        //controles
        {
            if (this.cursors.left.isDown && this.courantActif == false) {
                this.player.setVelocityX(-300);
                this.player.anims.play('left', true);
                this.lastFacingDirection = "left"

            }
            else if (this.cursors.right.isDown && this.courantActif == false) {
                this.player.setVelocityX(300);
                this.player.anims.play('right', true);
                this.lastFacingDirection = "right"

            }
            else if (this.courantActif == false) {
                this.player.setVelocityX(0);
            }


            if (this.cursors.up.isDown && this.courantActif == false) {
                this.player.setVelocityY(-300);
                this.player.anims.play('up', true);
                this.lastFacingDirection = "up";


            }
            else if (this.cursors.down.isDown && this.courantActif == false) {
                this.player.setVelocityY(350);
                this.player.anims.play('down', true);
                this.lastFacingDirection = "down";


            }
            else if (this.courantActif == false) {
                this.player.setVelocityY(0);
            }

            if (this.cursors.up.isDown && this.cursors.left.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('up', true); //et animation => droite

            }
            else if (this.cursors.up.isDown && this.cursors.right.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('up', true); //et animation => droite

            }
            else if (this.cursors.down.isDown && this.cursors.left.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('down', true); //et animation => droite

            }
            else if (this.cursors.down.isDown && this.cursors.right.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('down', true); //et animation => droite

            }

        }

        //gestion UI
        {
            if (this.vieMax == 2 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max2actuel1', true);

            }
            else if (this.vieMax == 2 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max2actuel2', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max4actuel1', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max4actuel2', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max4actuel3', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max4actuel4', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max6actuel1', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max6actuel2', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max6actuel3', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max6actuel4', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI1max6actuel5', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI1max6actuel6', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max8actuel1', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max8actuel2', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max8actuel3', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max8actuel4', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI1max8actuel5', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI1max8actuel6', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 7) {
                this.ui.anims.play(' UI1max8actuel7', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 8) {
                this.ui.anims.play(' UI1max8actuel8', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max10actuel1', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max10actuel2', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max10actuel3', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max10actuel4', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI1max10actuel5', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI1max10actuel6', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 7) {
                this.ui.anims.play(' UI1max10actuel7', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 8) {
                this.ui.anims.play(' UI1max10actuel8', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 9) {
                this.ui.anims.play(' UI1max10actuel9', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 10) {
                this.ui.anims.play(' UI1max10actuel10', true);

            }



        }


    }



}