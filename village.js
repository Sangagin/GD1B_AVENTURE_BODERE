//import {getSelection} from "./gestionUI.js";


class village extends Phaser.Scene {


    constructor() {

        super("village")
    }

    init(data) {
        console.log('init', data);

        this.origine = data.origin
        this.powerup2 = data.powerup2;
        this.powerup3 = data.powerup3;
        this.vieActuelle = data.vieA;
        this.vieMax = data.vieM;
        this.counterPerle = data.counterPerle
        this.boss1vaincu = data.boss1
        this.boss2vaincu = data.boss2
        this.boostViePrise= data.tabBoostVie

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


        this.load.image("tileVillage", "assets/tileset.png");
        this.load.image("gun", "assets/anims/pistolet_crevette.png");
        this.load.image("bulles", "assets/anims/bulles.png");
        this.load.image("requin", "assets/sprites/Sprite_enemmi_01.png");
        this.load.image("bullot", "assets/sprites/Sprite_enemmi_02.png");
        this.load.image("crevette", "assets/sprites/Sprite_enemmi_03.png");
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

        const calque_murs_village = carteDuNiveauVillage.createLayer(
            "murs",
            tilesetVillage
        );





        calque_murs_village.setCollisionByProperty({ EstSolide: true });





        //création player
        if (this.origine == "menu") {


            this.player = this.physics.add.sprite(900, 4000, 'perso');
        }
        else if (this.origine == "plaines") {
            this.player = this.physics.add.sprite(6200, 2230, 'perso');

        }
        else {
            this.player = this.physics.add.sprite(3720, 6200, 'perso');

        }
        const calque_maisons_village = carteDuNiveauVillage.createLayer(
            "maisons",
            tilesetVillage
        );
        calque_maisons_village.setCollisionByProperty({ EstSolide: true });

        this.player.setScale(1.2)
        this.player.setSize(45, 45)

        this.origine = "village"

        //collider avec les murs
        this.physics.add.collider(this.player, calque_murs_village);
        this.physics.add.collider(this.player, calque_maisons_village);

        //camera
        this.physics.world.setBounds(0, 0, 6400, 6400);
        this.cameras.main.setBounds(0, 0, 6400, 6400);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.8);

        //affichage UI
        this.ui = this.physics.add.sprite(130, 80, 'UI1');
        // this.ui.setScale(0.8)
        this.ui.depth = 2;
        this.ui.setScrollFactor(0)

        //compteur monnaie
        this.comptPerle = this.add.text(10, 160, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 });
        this.comptPerle.depth = 4
        this.comptPerle.setScrollFactor(0);
        //this.comptPerle.setScale(0.8)




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
        this.attk = true;
        this.degatsPris = false;



        //création ennemis
        {
            {
                this.requin0 = this.physics.add.sprite(2110, 3900, 'requin');
                this.requin0.body.immovable = true;
                this.physics.add.collider(this.player, this.requin0, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requin0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requin0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requin0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requin0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requin0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requin0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requin0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requin0, this.playerFrappeR, null, this);
                this.perleR0 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleR0, this.playerPerle, null, this);
                this.soinR0 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinR0, this.playerSoin, null, this);
                this.requin0.perle = this.perleR0;
                this.requin0.soin = this.soinR0;
            }
            {
                this.requin1 = this.physics.add.sprite(1200, 3800, 'requin');
                this.requin1.body.immovable = true;
                this.physics.add.collider(this.player, this.requin1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requin1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requin1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requin1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requin1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requin1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requin1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requin1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requin1, this.playerFrappeR, null, this);
                this.perleR1 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleR1, this.playerPerle, null, this);
                this.soinR1 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinR1, this.playerSoin, null, this);
                this.requin1.perle = this.perleR1;
                this.requin1.soin = this.soinR1;
            }
            {
                this.requin2 = this.physics.add.sprite(830, 1728, 'requin');
                this.requin2.body.immovable = true;
                this.physics.add.collider(this.player, this.requin2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requin2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requin2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requin2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requin2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requin2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requin2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requin2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requin2, this.playerFrappeR, null, this);
                this.perleR2 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleR2, this.playerPerle, null, this);
                this.soinR2 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinR2, this.playerSoin, null, this);
                this.requin2.perle = this.perleR2;
                this.requin2.soin = this.soinR2;
            }

            {
                this.requin3 = this.physics.add.sprite(4100, 4900, 'requin');
                this.requin3.body.immovable = true;
                this.physics.add.collider(this.player, this.requin3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requin3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requin3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requin3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requin3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requin3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requin3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requin3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requin3, this.playerFrappeR, null, this);
                this.perleR3 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleR3, this.playerPerle, null, this);
                this.soinR3 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinR3, this.playerSoin, null, this);
                this.requin3.perle = this.perleR3;
                this.requin3.soin = this.soinR3;
            }


            {
                this.bullot1 = this.physics.add.sprite(1375, 3680, 'bullot');
                this.bullot1.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot1, this.playerFrappeRate, null, this);
                this.perleB1 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB1, this.playerPerle, null, this);
                this.soinB1 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB1, this.playerSoin, null, this);
                this.bullot1.perle = this.perleB1;
                this.bullot1.soin = this.soinB1;
            }

            {
                this.bullot2 = this.physics.add.sprite(5530, 3170, 'bullot');
                this.bullot2.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot2, this.playerFrappeRate, null, this);
                this.perleB2 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB2, this.playerPerle, null, this);
                this.soinB2 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB2, this.playerSoin, null, this);
                this.bullot2.perle = this.perleB2;
                this.bullot2.soin = this.soinB2;
            }
            {
                this.bullot3 = this.physics.add.sprite(5530, 3170 + 64, 'bullot');
                this.bullot3.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot3, this.playerFrappeRate, null, this);
                this.perleB3 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB3, this.playerPerle, null, this);
                this.soinB3 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB3, this.playerSoin, null, this);
                this.bullot3.perle = this.perleB3;
                this.bullot3.soin = this.soinB3;
            }
            {
                this.bullot4 = this.physics.add.sprite(5530, 3170 + 128, 'bullot');
                this.bullot4.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot4, this.playerFrappeRate, null, this);
                this.perleB4 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB4, this.playerPerle, null, this);
                this.soinB4 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB4, this.playerSoin, null, this);
                this.bullot4.perle = this.perleB4;
                this.bullot4.soin = this.soinB4;
            }
            {
                this.bullot5 = this.physics.add.sprite(5530, 3170 + 128 + 64, 'bullot');
                this.bullot5.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot5, this.playerFrappeRate, null, this);
                this.perleB5 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB5, this.playerPerle, null, this);
                this.soinB5 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB5, this.playerSoin, null, this);
                this.bullot5.perle = this.perleB5;
                this.bullot5.soin = this.soinB5;
            }

            {
                this.bullot6 = this.physics.add.sprite(5530, 3170 + 128 + 128, 'bullot');
                this.bullot6.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot6, this.playerFrappeRate, null, this);
                this.perleB6 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB6, this.playerPerle, null, this);
                this.soinB6 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB6, this.playerSoin, null, this);
                this.bullot6.perle = this.perleB6;
                this.bullot6.soin = this.soinB6;
            }

            {
                this.bullot7 = this.physics.add.sprite(4450, 3620, 'bullot');
                this.bullot7.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot7, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot7, this.playerFrappeRate, null, this);
                this.perleB7 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB7, this.playerPerle, null, this);
                this.soinB7 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB7, this.playerSoin, null, this);
                this.bullot7.perle = this.perleB7;
                this.bullot7.soin = this.soinB7;
            }


            {
                this.bullot8 = this.physics.add.sprite(4200, 3940, 'bullot');
                this.bullot8.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot8, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot8, this.playerFrappeRate, null, this);
                this.perleB8 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB8, this.playerPerle, null, this);
                this.soinB8 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB8, this.playerSoin, null, this);
                this.bullot8.perle = this.perleB8;
                this.bullot8.soin = this.soinB8;
            }


            {
                this.bullot9 = this.physics.add.sprite(3615, 4330, 'bullot');
                this.bullot9.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot9, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot9, this.playerFrappeRate, null, this);
                this.perleB9 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB9, this.playerPerle, null, this);
                this.soinB9 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB9, this.playerSoin, null, this);
                this.bullot9.perle = this.perleB9;
                this.bullot9.soin = this.soinB9;
            }


            {
                this.bullot10 = this.physics.add.sprite(3680, 4420, 'bullot');
                this.bullot10.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot10, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot10, this.playerFrappeRate, null, this);
                this.perleB10 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB10, this.playerPerle, null, this);
                this.soinB10 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB10, this.playerSoin, null, this);
                this.bullot10.perle = this.perleB10;
                this.bullot10.soin = this.soinB10;
            }


            {
                this.bullot11 = this.physics.add.sprite(3580, 4650, 'bullot');
                this.bullot11.body.immovable = true;
                this.physics.add.collider(this.player, this.bullot11, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullot11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullot11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullot11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullot11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullot11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullot11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullot11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullot11, this.playerFrappeRate, null, this);
                this.perleB11 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleB11, this.playerPerle, null, this);
                this.soinB11 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinB11, this.playerSoin, null, this);
                this.bullot11.perle = this.perleB11;
                this.bullot11.soin = this.soinB11;
            }

        }
        //creation d'autants de perles et de coeurs que d'ennemis






//coeurs nat
        this.soinV_L0 = this.physics.add.sprite(1400, 2500, 'soin');
        this.physics.add.collider(this.player, this.soinV_L0, this.playerSoin, null, this);

        if(this.boostViePrise[0]==false){
            this.soinV_L1 = this.physics.add.sprite(290, 3810, 'boost');
            this.physics.add.collider(this.player, this.soinV_L1, this.playerVieUp, null, this);
        }
        this.soinV_L2 = this.physics.add.sprite(3815, 2524, 'soin');
        this.physics.add.collider(this.player, this.soinV_L2, this.playerSoin, null, this);

        //perles nat
        this.perleV_L0 = this.physics.add.sprite(5830, 3110, 'perle');
        this.physics.add.collider(this.player, this.perleV_L0, this.playerPerle, null, this);
        this.perleV_L1 = this.physics.add.sprite(2080, 2564, 'perle');
        this.physics.add.collider(this.player, this.perleV_L1, this.playerPerle, null, this);



        //cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastFacingDirection = "right"



        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);





        this.graphics = this.add.graphics();





        //path des ennemis qui bougent

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


        this.path2 = new Phaser.Curves.Path(830, 1728);
        this.path2.splineTo([830, 2500]);
        this.follow2 = this.add.follower(this.path2, 830, 1728);
        this.follow2.setScale(0.1);
        this.follow2.startFollow({
            duration: 5000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });


        this.path3 = new Phaser.Curves.Path(4100, 4900);
        this.path3.splineTo([4420, 5290]);
        this.follow3 = this.add.follower(this.path3, 4100, 4900);
        this.follow3.setScale(0.1);
        this.follow3.startFollow({
            duration: 5000,
            yoyo: true,
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


        this.courantActif = false
        this.graphics.lineStyle(2, 0xffffff, 1);
        // this.path3.draw(this.graphics);


    }

    update() {



        this.comptPerle.setText(this.counterPerle)

        //game over
        if (this.vieActuelle <= 0) {
            console.log("change")
            this.scene.start("menu", { etat: true });
        }




        //param des téléporteurs de scenes
        if (this.player.x > 6330) {
            this.scene.start("plaines", { origin: this.origine, powerup2: this.powerup2, powerup3: this.powerup3, vieA: this.vieActuelle, vieM: this.vieMax, counterPerle: this.counterPerle, boss1: this.boss1vaincu, boss2: this.boss2vaincu,tabBoostVie:this.boostViePrise });
        }

/*
        //pour tester le donjon 1 immédiatement : décommenter le if qui suit
        if (this.player.x > 100) {
            this.scene.start("donjon1", { origin: this.origine, powerup2: this.powerup2, powerup3: this.powerup3, vieA: this.vieActuelle, vieM: this.vieMax, counterPerle: this.counterPerle });
        }
*/


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




        //mouvements de ennemis
        this.requin1.x = this.follow1.x
        this.requin1.y = this.follow1.y
        this.requin2.x = this.follow2.x
        this.requin2.y = this.follow2.y
        this.requin3.x = this.follow3.x
        this.requin3.y = this.follow3.y

        //touches de controlex
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



    playerHitR(player) {
        if (!this.degatsPris) {
            this.degatsPris = true;
            player.setTint(0xff0000);
            this.vieActuelle = this.vieActuelle - 1
            player.scene.cameras.main.shake(500, 0.005);


            setTimeout(() => {
                this.degatsPris = false;
                player.setTint();

            }, 300);
        }

    }


    playerFrappeR(player, requin) {
        this.value = Phaser.Math.Between(0, 10);

        if (this.value <= 5) {
            requin.perle.x = requin.x
            requin.perle.y = requin.y
        }

        if ((this.value >= 6) && (this.value <= 8)) {
            requin.soin.x = requin.x
            requin.soin.y = requin.y

        }
        requin.destroy();

    }


    playerPerle(player, perle) {

        perle.x = 0
        perle.y = 6200
        this.counterPerle++


    }

    playerSoin(player, soin) {
        soin.x = 0
        soin.y = 6200
        console.log(this.vieActuelle)
        if (this.vieMax == 2) {
            if (this.vieActuelle < 2) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 4) {
            if (this.vieActuelle < 4) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 6) {
            if (this.vieActuelle < 6) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 8) {
            if (this.vieActuelle < 8) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 10) {
            if (this.vieActuelle < 10) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
    }

    playerVieUp(player, boost) {
        boost.x = 0
        boost.y = 6200
        console.log(this.vieActuelle)
        this.boostViePrise[0]=true
        if (this.vieMax < 10) {
            this.vieMax = this.vieMax + 2
            this.vieActuelle = this.vieActuelle + 2

        }

    }





}