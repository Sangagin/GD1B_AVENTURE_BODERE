//import {getSelection} from "./gestionUI.js";


class abysses extends Phaser.Scene {


    constructor() {

        super("abysses")
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
        this.boostViePrise = data.tabBoostVie

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


        this.load.image("tileAbysses", "assets/tileset.png");
        this.load.image("gun", "assets/anims/pistolet_crevette.png");
        this.load.image("bulles", "assets/anims/bulles.png");
        this.load.image("requin", "assets/sprites/Sprite_enemmi_01.png");
        this.load.image("bullot", "assets/sprites/Sprite_enemmi_02.png");
        this.load.image("crevette", "assets/sprites/Sprite_enemmi_03.png");
        this.load.image("soin", "assets/sprites/Sprite_coeur_soin.png");
        this.load.image("perle", "assets/sprites/Sprite_perle.png");
        this.load.image("bonus", "assets/sprites/Sprite_coeur_bonus.png");




        this.load.tilemapTiledJSON("carteAbysses", "assets/maps/map_abysses.json");

    }


    create() {

        const carteDuNiveauAbysses = this.add.tilemap("carteAbysses");



        const tilesetAbysses = carteDuNiveauAbysses.addTilesetImage(
            "tileset",
            "tileAbysses"
        );


        const calque_sol_abysses = carteDuNiveauAbysses.createLayer(
            "sol_abysses",
            tilesetAbysses
        );

        const calque_murs_abysses = carteDuNiveauAbysses.createLayer(
            "murs_abysses",
            tilesetAbysses
        );
        const calque_decos_abysses = carteDuNiveauAbysses.createLayer(
            "decos_abysses",
            tilesetAbysses
        );




        calque_murs_abysses.setCollisionByProperty({ EstSolide: true });
        calque_decos_abysses.setCollisionByProperty({ EstSolide: true });





        //création player
        if (this.origine == "village") {


            this.player = this.physics.add.sprite(4450, 280, 'perso');
        }

        else {
            this.player = this.physics.add.sprite(800, 4630, 'perso');

        }



        this.player.setScale(1.2)
        this.player.setSize(45, 45)

        this.origine = "abysses"

        //collider avec les murs
        this.physics.add.collider(this.player, calque_murs_abysses);

        this.physics.add.collider(this.player, calque_decos_abysses);


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

        //compteur perle
        this.comptPerle = this.add.text(10, 160, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 });
        this.comptPerle.depth = 4
        this.comptPerle.setScrollFactor(0);
        //this.comptPerle.setScale(0.8)




        //création armes
        this.epee = this.physics.add.sprite(0, 9000, 'epee');
        this.epee2 = this.physics.add.sprite(0, 9000, 'epee2');
        this.pince = this.physics.add.sprite(0, 9000, 'pince');
        this.pince2 = this.physics.add.sprite(0, 9000, 'pince2');
        this.gun = this.physics.add.sprite(0, 9000, 'gun');
        this.bulles1 = this.physics.add.sprite(0, 9000, 'bulles');
        this.bulles2 = this.physics.add.sprite(0, 9000, 'bulles');
        this.bulles3 = this.physics.add.sprite(0, 9000, 'bulles');
        this.bulles4 = this.physics.add.sprite(0, 9000, 'bulles');

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
                this.perleR0 = this.physics.add.sprite(0, 9000, 'perle');
                this.physics.add.collider(this.player, this.perleR0, this.playerPerle, null, this);
                this.soinR0 = this.physics.add.sprite(0, 9000, 'soin');
                this.physics.add.collider(this.player, this.soinR0, this.playerSoin, null, this);
                this.requin0.perle = this.perleR0;
                this.requin0.soin = this.soinR0;
                this.requin0.vivant = true
            }
            {
                this.requin1 = this.physics.add.sprite(2110, 3900, 'requin');
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
                this.perleR1 = this.physics.add.sprite(0, 9000, 'perle');
                this.physics.add.collider(this.player, this.perleR1, this.playerPerle, null, this);
                this.soinR1 = this.physics.add.sprite(0, 9000, 'soin');
                this.physics.add.collider(this.player, this.soinR1, this.playerSoin, null, this);
                this.requin1.perle = this.perleR1;
                this.requin1.soin = this.soinR1;
                this.requin1.vivant = true

            }
            {
                this.requin2 = this.physics.add.sprite(2110, 3902, 'requin');
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
                this.perleR2 = this.physics.add.sprite(2, 9222, 'perle');
                this.physics.add.collider(this.player, this.perleR2, this.playerPerle, null, this);
                this.soinR2 = this.physics.add.sprite(2, 9222, 'soin');
                this.physics.add.collider(this.player, this.soinR2, this.playerSoin, null, this);
                this.requin2.perle = this.perleR2;
                this.requin2.soin = this.soinR2;
                this.requin2.vivant = true

            }
            {
                this.requin3 = this.physics.add.sprite(2113, 3933, 'requin');
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
                this.perleR3 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleR3, this.playerPerle, null, this);
                this.soinR3 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinR3, this.playerSoin, null, this);
                this.requin3.perle = this.perleR3;
                this.requin3.soin = this.soinR3;
                this.requin3.vivant = true

            }
            {
                this.requin4 = this.physics.add.sprite(2100, 6080, 'requin');
                this.requin4.body.immovable = true;
                this.physics.add.collider(this.player, this.requin4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requin4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requin4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requin4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requin4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requin4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requin4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requin4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requin4, this.playerFrappeR, null, this);
                this.perleR4 = this.physics.add.sprite(0, 9000, 'perle');
                this.physics.add.collider(this.player, this.perleR4, this.playerPerle, null, this);
                this.soinR4 = this.physics.add.sprite(0, 9000, 'soin');
                this.physics.add.collider(this.player, this.soinR4, this.playerSoin, null, this);
                this.requin4.perle = this.perleR4;
                this.requin4.soin = this.soinR4;
                this.requin4.vivant = true
            }

            //crevettes
            {
                this.crevetteA1 = this.physics.add.sprite(5200, 1130, 'crevette');
                this.crevetteA1.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA1, this.playerFrappeR, null, this);
                this.perleAC1 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC1, this.playerPerle, null, this);
                this.soinAC1 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC1, this.playerSoin, null, this);
                this.crevetteA1.perle = this.perleAC1;
                this.crevetteA1.soin = this.soinAC1;
                this.crevetteA1.vivant = true

            }

            {
                this.crevetteA2 = this.physics.add.sprite(3260, 955, 'crevette');
                this.crevetteA2.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA2, this.playerFrappeR, null, this);
                this.perleAC2 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC2, this.playerPerle, null, this);
                this.soinAC2 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC2, this.playerSoin, null, this);
                this.crevetteA2.perle = this.perleAC2;
                this.crevetteA2.soin = this.soinAC2;
                this.crevetteA2.vivant = true

            }
            {
                this.crevetteA3 = this.physics.add.sprite(2500, 640, 'crevette');
                this.crevetteA3.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA3, this.playerFrappeR, null, this);
                this.perleAC3 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC3, this.playerPerle, null, this);
                this.soinAC3 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC3, this.playerSoin, null, this);
                this.crevetteA3.perle = this.perleAC3;
                this.crevetteA3.soin = this.soinAC3;
                this.crevetteA3.vivant = true

            }
            {
                this.crevetteA4 = this.physics.add.sprite(1000, 1150, 'crevette');
                this.crevetteA4.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA4, this.playerFrappeR, null, this);
                this.perleAC4 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC4, this.playerPerle, null, this);
                this.soinAC4 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC4, this.playerSoin, null, this);
                this.crevetteA4.perle = this.perleAC4;
                this.crevetteA4.soin = this.soinAC4;
                this.crevetteA4.vivant = true

            }
            {
                this.crevetteA5 = this.physics.add.sprite(1780, 1890, 'crevette');
                this.crevetteA5.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA5, this.playerFrappeR, null, this);
                this.perleAC5 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC5, this.playerPerle, null, this);
                this.soinAC5 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC5, this.playerSoin, null, this);
                this.crevetteA5.perle = this.perleAC5;
                this.crevetteA5.soin = this.soinAC5;
                this.crevetteA5.vivant = true

            }
            {
                this.crevetteA6 = this.physics.add.sprite(1820, 4000, 'crevette');
                this.crevetteA6.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA6, this.playerFrappeR, null, this);
                this.perleAC6 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC6, this.playerPerle, null, this);
                this.soinAC6 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC6, this.playerSoin, null, this);
                this.crevetteA6.perle = this.perleAC6;
                this.crevetteA6.soin = this.soinAC6;
                this.crevetteA6.vivant = true

            }
            {
                this.crevetteA7 = this.physics.add.sprite(960, 6010, 'crevette');
                this.crevetteA7.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA7, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA7, this.playerFrappeR, null, this);
                this.perleAC7 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC7, this.playerPerle, null, this);
                this.soinAC7 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC7, this.playerSoin, null, this);
                this.crevetteA7.perle = this.perleAC7;
                this.crevetteA7.soin = this.soinAC7;
                this.crevetteA7.vivant = true

            }
            {
                this.crevetteA8 = this.physics.add.sprite(3170, 4500, 'crevette');
                this.crevetteA8.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA8, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA8, this.playerFrappeR, null, this);
                this.perleAC8 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC8, this.playerPerle, null, this);
                this.soinAC8 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC8, this.playerSoin, null, this);
                this.crevetteA8.perle = this.perleAC8;
                this.crevetteA8.soin = this.soinAC8;
                this.crevetteA8.vivant = true

            }
            {
                this.crevetteA9 = this.physics.add.sprite(5020, 5180, 'crevette');
                this.crevetteA9.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA9, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA9, this.playerFrappeR, null, this);
                this.perleAC9 = this.physics.add.sprite(3, 9333, 'perle');
                this.physics.add.collider(this.player, this.perleAC9, this.playerPerle, null, this);
                this.soinAC9 = this.physics.add.sprite(3, 9333, 'soin');
                this.physics.add.collider(this.player, this.soinAC9, this.playerSoin, null, this);
                this.crevetteA9.perle = this.perleAC9;
                this.crevetteA9.soin = this.soinAC9;
                this.crevetteA9.vivant = true

            }
            {
                this.crevetteA10 = this.physics.add.sprite(5020, 5500, 'crevette');
                this.crevetteA10.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA10, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA10, this.playerFrappeR, null, this);
                this.perleAC10 = this.physics.add.sprite(3, 10333, 'perle');
                this.physics.add.collider(this.player, this.perleAC10, this.playerPerle, null, this);
                this.soinAC10 = this.physics.add.sprite(3, 10333, 'soin');
                this.physics.add.collider(this.player, this.soinAC10, this.playerSoin, null, this);
                this.crevetteA10.perle = this.perleAC10;
                this.crevetteA10.soin = this.soinAC10;
                this.crevetteA10.vivant = true

            }
            {
                this.crevetteA11 = this.physics.add.sprite(5250, 5350, 'crevette');
                this.crevetteA11.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA11, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA11, this.playerFrappeR, null, this);
                this.perleAC11 = this.physics.add.sprite(3, 11333, 'perle');
                this.physics.add.collider(this.player, this.perleAC11, this.playerPerle, null, this);
                this.soinAC11 = this.physics.add.sprite(3, 11333, 'soin');
                this.physics.add.collider(this.player, this.soinAC11, this.playerSoin, null, this);
                this.crevetteA11.perle = this.perleAC11;
                this.crevetteA11.soin = this.soinAC11;
                this.crevetteA11.vivant = true

            }
            {
                this.crevetteA12 = this.physics.add.sprite(5825, 2000, 'crevette');
                this.crevetteA12.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA12, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA12, this.playerFrappeR, null, this);
                this.perleAC12 = this.physics.add.sprite(3, 12333, 'perle');
                this.physics.add.collider(this.player, this.perleAC12, this.playerPerle, null, this);
                this.soinAC12 = this.physics.add.sprite(3, 12333, 'soin');
                this.physics.add.collider(this.player, this.soinAC12, this.playerSoin, null, this);
                this.crevetteA12.perle = this.perleAC12;
                this.crevetteA12.soin = this.soinAC12;
                this.crevetteA12.vivant = true

            }
            {
                this.crevetteA13 = this.physics.add.sprite(1584, 2529, 'crevette');
                this.crevetteA13.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA13, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA13, this.playerFrappeR, null, this);
                this.perleAC13 = this.physics.add.sprite(3, 13333, 'perle');
                this.physics.add.collider(this.player, this.perleAC13, this.playerPerle, null, this);
                this.soinAC13 = this.physics.add.sprite(3, 13333, 'soin');
                this.physics.add.collider(this.player, this.soinAC13, this.playerSoin, null, this);
                this.crevetteA13.perle = this.perleAC13;
                this.crevetteA13.soin = this.soinAC13;
                this.crevetteA13.vivant = true

            }
            {
                this.crevetteA14 = this.physics.add.sprite(3450, 3450, 'crevette');
                this.crevetteA14.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA14, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA14, this.playerFrappeR, null, this);
                this.perleAC14 = this.physics.add.sprite(3, 14333, 'perle');
                this.physics.add.collider(this.player, this.perleAC14, this.playerPerle, null, this);
                this.soinAC14 = this.physics.add.sprite(3, 14333, 'soin');
                this.physics.add.collider(this.player, this.soinAC14, this.playerSoin, null, this);
                this.crevetteA14.perle = this.perleAC14;
                this.crevetteA14.soin = this.soinAC14;
                this.crevetteA14.vivant = true

            }
            {
                this.crevetteA15 = this.physics.add.sprite(5216, 4500, 'crevette');
                this.crevetteA15.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA15, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA15, this.playerFrappeR, null, this);
                this.perleAC15 = this.physics.add.sprite(3, 15333, 'perle');
                this.physics.add.collider(this.player, this.perleAC15, this.playerPerle, null, this);
                this.soinAC15 = this.physics.add.sprite(3, 15333, 'soin');
                this.physics.add.collider(this.player, this.soinAC15, this.playerSoin, null, this);
                this.crevetteA15.perle = this.perleAC15;
                this.crevetteA15.soin = this.soinAC15;
                this.crevetteA15.vivant = true

            }            
            {
                this.crevetteA16 = this.physics.add.sprite(6100, 4000, 'crevette');
                this.crevetteA16.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA16, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA16, this.playerFrappeR, null, this);
                this.perleAC16 = this.physics.add.sprite(3, 16333, 'perle');
                this.physics.add.collider(this.player, this.perleAC16, this.playerPerle, null, this);
                this.soinAC16 = this.physics.add.sprite(3, 16333, 'soin');
                this.physics.add.collider(this.player, this.soinAC16, this.playerSoin, null, this);
                this.crevetteA16.perle = this.perleAC16;
                this.crevetteA16.soin = this.soinAC16;
                this.crevetteA16.vivant = true

            }
            {
                this.crevetteA17 = this.physics.add.sprite(3100, 5500, 'crevette');
                this.crevetteA17.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteA17, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteA17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteA17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteA17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteA17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteA17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteA17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteA17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteA17, this.playerFrappeR, null, this);
                this.perleAC17 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleAC17, this.playerPerle, null, this);
                this.soinAC17 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinAC17, this.playerSoin, null, this);
                this.crevetteA17.perle = this.perleAC17;
                this.crevetteA17.soin = this.soinAC17;
                this.crevetteA17.vivant = true

            }


        }
        //creation d'autants de perles et de coeurs que d'ennemis






        //coeurs nat
        this.soinA_L0 = this.physics.add.sprite(6080, 4200, 'soin');
        this.physics.add.collider(this.player, this.soinA_L0, this.playerSoin, null, this);

        if (this.boostViePrise[3] == false) {
            this.soinA_L1 = this.physics.add.sprite(3970, 3800, 'bonus');
            this.physics.add.collider(this.player, this.soinA_L1, this.playerVieUp, null, this);
        }

        this.soinA_L2 = this.physics.add.sprite(5600, 4516, 'soin');
        this.physics.add.collider(this.player, this.soinA_L2, this.playerSoin, null, this);

        this.soinA_L3 = this.physics.add.sprite(513, 4700, 'soin');
        this.physics.add.collider(this.player, this.soinA_L3, this.playerSoin, null, this);

        this.soinA_L4 = this.physics.add.sprite(1050, 4700, 'soin');
        this.physics.add.collider(this.player, this.soinV_A4, this.playerSoin, null, this);

        this.soinA_L5 = this.physics.add.sprite(579, 2225, 'soin');
        this.physics.add.collider(this.player, this.soinV_A5, this.playerSoin, null, this);

        //perles nat
        this.perleA_L0 = this.physics.add.sprite(4800, 5200, 'perle');
        this.physics.add.collider(this.player, this.perleA_L0, this.playerPerle, null, this);
        this.perleA_L1 = this.physics.add.sprite(4800, 5500, 'perle');
        this.physics.add.collider(this.player, this.perleA_L1, this.playerPerle, null, this);
        this.perleA_L2 = this.physics.add.sprite(1375, 5666, 'perle');
        this.physics.add.collider(this.player, this.perleA_L2, this.playerPerle, null, this);
        this.perleA_L3 = this.physics.add.sprite(828, 1160, 'perle');
        this.physics.add.collider(this.player, this.perleA_L3, this.playerPerle, null, this);
        this.perleA_L4 = this.physics.add.sprite(1130, 1160, 'perle');
        this.physics.add.collider(this.player, this.perleA_L4, this.playerPerle, null, this);


        //cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastFacingDirection = "right"



        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);





        this.graphics = this.add.graphics();





        //path des ennemis qui bougent

        this.pathA1 = new Phaser.Curves.Path(3104, 2175);
        this.pathA1.splineTo([3104, 2630]);
        // this.path1.closePath()
        this.followA1 = this.add.follower(this.pathA1, 2620, 2175);
        this.followA1.setScale(0.1);
        this.followA1.startFollow({
            duration: 1000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followA2 = this.add.follower(this.pathA1, 2945, 2175);
        this.followA2.setScale(0.1);
        this.followA2.startFollow({
            duration: 1000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followA3 = this.add.follower(this.pathA1, 3264, 2175);
        this.followA3.setScale(0.1);
        this.followA3.startFollow({
            duration: 1000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followA4 = this.add.follower(this.pathA1, 3580, 2175);
        this.followA4.setScale(0.1);
        this.followA4.startFollow({
            duration: 1000,
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
        if (this.player.y < 50) {
            this.scene.start("village", { origin: this.origine, powerup2: this.powerup2, powerup3: this.powerup3, vieA: this.vieActuelle, vieM: this.vieMax, counterPerle: this.counterPerle, boss1: this.boss1vaincu, boss2: this.boss2vaincu, tabBoostVie: this.boostViePrise });
        }
if((this.player.x > 760 && this.player.x < 840) && (this.player.y > 4382 && this.player.y < 4480)){
        this.scene.start("donjon2", { origin: this.origine, powerup2: this.powerup2, powerup3: this.powerup3, vieA: this.vieActuelle, vieM: this.vieMax, counterPerle: this.counterPerle ,boss1: this.boss1vaincu, boss2: this.boss2vaincu,tabBoostVie:this.boostViePrise });
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
                this.epee.y = 15000;
                this.epee2.x = 0;
                this.epee2.y = 15000;
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
                this.pince.y = 15000;
                this.pince2.x = 0;
                this.pince2.y = 15000;
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
                this.gun.y = 15500;
                this.gun.x = 0;
                this.gun.y = 15000;
                this.attk = true;
            }, 300);
        }




        //mouvements de ennemis
        this.requin0.x = this.followA1.x
        this.requin0.y = this.followA1.y
        this.requin1.x = this.followA2.x
        this.requin1.y = this.followA2.y
        this.requin2.x = this.followA3.x
        this.requin2.y = this.followA3.y
        this.requin3.x = this.followA4.x
        this.requin3.y = this.followA4.y


        if (this.crevetteA1.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA1.x, this.crevetteA1.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA1.setVelocity(this.player.x - this.crevetteA1.x, this.player.y - this.crevetteA1.y);
            } else {
                this.crevetteA1.setVelocity(0);
            }
        }
        if (this.crevetteA2.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA2.x, this.crevetteA2.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA2.setVelocity(this.player.x - this.crevetteA2.x, this.player.y - this.crevetteA2.y);
            } else {
                this.crevetteA2.setVelocity(0);
            }
        }
        if (this.crevetteA3.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA3.x, this.crevetteA3.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA3.setVelocity(this.player.x - this.crevetteA3.x, this.player.y - this.crevetteA3.y);
            } else {
                this.crevetteA3.setVelocity(0);
            }
        }
        if (this.crevetteA4.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA4.x, this.crevetteA4.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA4.setVelocity(this.player.x - this.crevetteA4.x, this.player.y - this.crevetteA4.y);
            } else {
                this.crevetteA4.setVelocity(0);
            }
        }
        if (this.crevetteA5.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA5.x, this.crevetteA5.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA5.setVelocity(this.player.x - this.crevetteA5.x, this.player.y - this.crevetteA5.y);
            } else {
                this.crevetteA5.setVelocity(0);
            }
        }
        if (this.crevetteA6.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA6.x, this.crevetteA6.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA6.setVelocity(this.player.x - this.crevetteA6.x, this.player.y - this.crevetteA6.y);
            } else {
                this.crevetteA6.setVelocity(0);
            }
        }
        if (this.crevetteA7.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA7.x, this.crevetteA7.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA7.setVelocity(this.player.x - this.crevetteA7.x, this.player.y - this.crevetteA7.y);
            } else {
                this.crevetteA7.setVelocity(0);
            }
        }
        if (this.crevetteA8.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA8.x, this.crevetteA8.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA8.setVelocity(this.player.x - this.crevetteA8.x, this.player.y - this.crevetteA8.y);
            } else {
                this.crevetteA8.setVelocity(0);
            }
        }
        if (this.crevetteA9.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA9.x, this.crevetteA9.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA9.setVelocity(this.player.x - this.crevetteA9.x, this.player.y - this.crevetteA9.y);
            } else {
                this.crevetteA9.setVelocity(0);
            }
        }
        if (this.crevetteA10.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA10.x, this.crevetteA10.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA10.setVelocity(this.player.x - this.crevetteA10.x, this.player.y - this.crevetteA10.y);
            } else {
                this.crevetteA10.setVelocity(0);
            }
        }
        if (this.crevetteA11.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA11.x, this.crevetteA11.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA11.setVelocity(this.player.x - this.crevetteA11.x, this.player.y - this.crevetteA11.y);
            } else {
                this.crevetteA11.setVelocity(0);
            }
        }
        if (this.crevetteA12.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA12.x, this.crevetteA12.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA12.setVelocity(this.player.x - this.crevetteA12.x, this.player.y - this.crevetteA12.y);
            } else {
                this.crevetteA12.setVelocity(0);
            }
        }
        if (this.crevetteA13.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA13.x, this.crevetteA13.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA13.setVelocity(this.player.x - this.crevetteA13.x, this.player.y - this.crevetteA13.y);
            } else {
                this.crevetteA13.setVelocity(0);
            }
        }
        if (this.crevetteA14.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA14.x, this.crevetteA14.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA14.setVelocity(this.player.x - this.crevetteA14.x, this.player.y - this.crevetteA14.y);
            } else {
                this.crevetteA14.setVelocity(0);
            }
        }
        if (this.crevetteA15.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA15.x, this.crevetteA15.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA15.setVelocity(this.player.x - this.crevetteA15.x, this.player.y - this.crevetteA15.y);
            } else {
                this.crevetteA15.setVelocity(0);
            }
        }
        if (this.crevetteA16.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA16.x, this.crevetteA16.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA16.setVelocity(this.player.x - this.crevetteA16.x, this.player.y - this.crevetteA16.y);
            } else {
                this.crevetteA16.setVelocity(0);
            }
        }
        if (this.crevetteA17.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteA17.x, this.crevetteA17.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteA17.setVelocity(this.player.x - this.crevetteA17.x, this.player.y - this.crevetteA17.y);
            } else {
                this.crevetteA17.setVelocity(0);
            }
        }



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
        requin.vivant = false
        requin.destroy();

    }


    playerPerle(player, perle) {

        perle.x = 0
        perle.y = 15000
        this.counterPerle++


    }

    playerSoin(player, soin) {
        soin.x = 0
        soin.y = 15000
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
        boost.y = 15000
        console.log(this.vieActuelle)
        this.boostViePrise[3] = true
        if (this.vieMax < 10) {
            this.vieMax = this.vieMax + 2
            this.vieActuelle = this.vieActuelle + 2

        }

    }





}