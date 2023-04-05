//import {getSelection} from "./gestionUI.js";


class village extends Phaser.Scene {


    constructor() {

        super("village")
    }

    init(data) {
        console.log('init', data);

        this.powerup2 = data.powerup2;
        this.vieActuelle = data.vieA;
        this.vieMax = data.vieM;
    }


    preload() {
        this.load.spritesheet('perso', 'assets/sprites/Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('courrant', 'assets/sprites/courrant.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('epee', 'assets/anims/Anim_epee.png',
            { frameWidth: 64, frameHeight: 64 * 2 });

        this.load.spritesheet('epee2', 'assets/anims/Anim_epee2.png',
            { frameWidth: 64 * 2, frameHeight: 64 });

        this.load.spritesheet('pince', 'assets/anims/Sprite_pince.png',
            { frameWidth: 128, frameHeight: 64 });

        this.load.spritesheet('pince2', 'assets/anims/Sprite_pince2.png',
            { frameWidth: 64, frameHeight: 128 });



        this.load.spritesheet('UI1', 'assets/UI/UI_1.png',
            { frameWidth: 576, frameHeight: 320 });
        this.load.spritesheet('UI2', 'assets/UI/UI_2.png',
            { frameWidth: 576, frameHeight: 320 });
        this.load.spritesheet('UI3', 'assets/UI/UI_3.png',
            { frameWidth: 576, frameHeight: 320 });


        this.load.image("tileVillage", "assets/tileset.png");
        this.load.image("gun", "assets/anims/pistolet_crevette.png");
        this.load.image("bulles", "assets/anims/bulles.png");
        this.load.image("requin", "assets/sprites/Sprite_enemmi_01.png");
        this.load.image("soin", "assets/sprites/Sprite_coeur_soin.png");
        this.load.image("perle", "assets/sprites/Sprite_perle.png");




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
        // this.player.setScale(1.6);
        //this.player.setSize(64, 32, true);
        //this.player.setOffset(2, 17);


        //collider avec les murs
        this.physics.add.collider(this.player, calque_murs_village);


        this.physics.world.setBounds(0, 0, 6400, 6400);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 6400, 6400);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);

        console.log(this.cameras.main.x)
        //affichage UI
        this.ui = this.physics.add.sprite(0, 0, 'UI1');
        this.ui.setScale(0.8)
        this.ui.depth = 2;

        this.comptPerle = this.add.text(135, 195, 'x 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 });
        this.comptPerle.depth = 4
        this.comptPerle.setScrollFactor(0);
        this.comptPerle.setScale(0.8)


        //this.ui.setScrollFactor(0);


        //création armes
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
        this.drop = false;
        this.attk = true;
        this.degatsPris = false;


        //création ennemis
        {
            this.requin1 = this.physics.add.sprite(1200, 3800, 'requin');
            this.requin1.body.immovable = true;
            this.physics.add.collider(this.player, this.requin1, this.playerHitR);
            this.physics.add.overlap(this.epee, this.requin1, this.playerFrappeR, null, this);
            this.physics.add.overlap(this.epee2, this.requin1, this.playerFrappeR);
        }

        //creation d'autants de perles que d'ennemis

        this.perle = this.physics.add.sprite(0, 6200, 'perle');

        //collider bulles avec ennemis


        //cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastFacingDirection = "right"



        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);





        this.graphics = this.add.graphics();







console.log(this.vieActuelle)
        this.vieActuelle = 10
        this.vieMax = 10

        console.log(this.vieActuelle)






        this.path1 = new Phaser.Curves.Path(2300, 2700);
        this.path1.splineTo([1850, 2650, 1850, 2370, 2180, 2370, 2330, 2560, 2300, 2700]);
        // this.path1.closePath()
        this.follow1 = this.add.follower(this.path1, 2300, 2700);
        this.follow1.setScale(0.1);
        this.follow1.startFollow({
            duration: 6000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });


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

        this.physics.add.overlap(this.player, this.courant, this.moveForce, null, this);

        /*
                this.graphics.lineStyle(2, 0xffffff, 1);
                this.path.draw(this.graphics);
        */

    }

    update() {



        //mouvement de l'ui avec le joueur
        this.ui.x = this.player.x - 400;
        this.ui.y = this.player.y - 230;


        //param des téléporteurs de scenes
        if (this.player.x > 3000) {
            this.scene.start("plaines");
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


        if (this.keyZ.isDown && this.attk) {
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

        if (this.keyE.isDown && this.attk) {
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

        //degats pris




        //mouvements de ennemis
        this.requin1.x = this.follow1.x
        this.requin1.y = this.follow1.y

        //touches de controlex
        {
            if (this.cursors.left.isDown) { //si la touche gauche est appuyée
                this.player.setVelocityX(-300); //alors vitesse négative en X
                this.player.anims.play('left', true);
                this.lastFacingDirection = "left"
                //   this.player.setSize(64, 32, true);
                // this.player.setOffset(2, 17);
                //this.courant.anims.play('coura', true);
            }
            else if (this.cursors.right.isDown) { //sinon si la touche droite est appuyée
                this.player.setVelocityX(300); //alors vitesse positive en X
                this.player.anims.play('right', true); //et animation => droite
                this.lastFacingDirection = "right"
                //  this.player.setSize(64, 32, true);
                //this.player.setOffset(2, 17);
            }
            else { // sinon
                this.player.setVelocityX(0); //vitesse nulle
            }


            if (this.cursors.up.isDown) { //sinon si la touche droite est appuyée
                this.player.setVelocityY(-300); //alors vitesse positive en X
                this.player.anims.play('up', true); //et animation => droite
                this.lastFacingDirection = "up";


            }
            else if (this.cursors.down.isDown) { //sinon si la touche droite est appuyée
                this.player.setVelocityY(350); //alors vitesse positive en X
                this.player.anims.play('down', true); //et animation => droite
                this.lastFacingDirection = "down";


            }
            else { // sinon
                this.player.setVelocityY(0); //vitesse nulle
            }

            if (this.cursors.up.isDown && this.cursors.left.isDown) {
                //ajouter anim diagonales si j'ai le temps
                console.log("diag")
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

    moveForce() {
        console.log(this.vieMax)
        /*
                setTimeout(() => {
                    this.cursors.right.reset();
                }, 300);
        */


    }


    playerHitR(player) {
        if (!this.degatsPris) {
            this.degatsPris = true;
            player.setTint(0xff0000);
            this.vieActuelle = this.vieActuelle - 1



            setTimeout(() => {
                this.degatsPris = false;
                player.setTint();

            }, 300);
        }

    }


    playerFrappeR(player, requin) {
        console.log("touche requin avec épée")
        this.drop = true;
        console.log(player.x)
        requin.destroy();
    }









}